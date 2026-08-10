import { createHash, randomInt, randomUUID } from 'crypto'
import prismaClient from '../../prisma'
import { apiEmail } from '../../Utils/apiMessenger'
import { AppError } from '../../Utils/AppErrorExtend'
import { AuthSessionService } from './AuthSessionService'
import { getDeviceName, TrustedDeviceService } from './TrustedDeviceService'
import { notifyNewDeviceConnected } from '../../Utils/securityNotification'

const CHALLENGE_DURATION_MS = 10 * 60 * 1000
const RESEND_INTERVAL_MS = 60 * 1000
const MAX_ATTEMPTS = 5

interface CreateChallengeInput {
    userId: string
    name: string
    email: string
    userAgent?: string
    ipAddress?: string
    replaceDeviceId?: string
}

const generateCode = (): string => randomInt(0, 1_000_000).toString().padStart(6, '0')
const hashCode = (challengeId: string, code: string): string =>
    createHash('sha256').update(`${challengeId}:${code}`).digest('hex')

const maskEmail = (email: string): string => {
    const [local, domain] = email.split('@')
    if (!domain) return email
    return `${local.slice(0, 2)}${'*'.repeat(Math.max(local.length - 2, 2))}@${domain}`
}

const sendCode = async (name: string, email: string, code: string, deviceName?: string) => {
    try {
        await apiEmail.post('/notification/device-verification', {
            name,
            email,
            code,
            deviceName,
            expiresInMinutes: CHALLENGE_DURATION_MS / 60_000,
        })
    } catch {
        throw new AppError('Não foi possível enviar o código de confirmação.', 502)
    }
}

export class DeviceVerificationService {
    static async create(input: CreateChallengeInput) {
        const existing = await prismaClient.deviceVerificationChallenge.findFirst({
            where: {
                userId: input.userId,
                consumedAt: null,
                expiresAt: { gt: new Date() },
                replaceDeviceId: input.replaceDeviceId ?? null,
            },
            orderBy: { createdAt: 'desc' },
        })

        if (existing) {
            const resendIn = Math.max(
                Math.ceil((RESEND_INTERVAL_MS - (Date.now() - existing.lastSentAt.getTime())) / 1000),
                0,
            )
            return {
                verificationRequired: true as const,
                challengeId: existing.id,
                maskedEmail: maskEmail(input.email),
                expiresInSeconds: Math.max(
                    Math.ceil((existing.expiresAt.getTime() - Date.now()) / 1000),
                    0,
                ),
                resendAfterSeconds: resendIn,
            }
        }

        const id = randomUUID()
        const code = generateCode()

        await prismaClient.deviceVerificationChallenge.deleteMany({
            where: { userId: input.userId, consumedAt: null },
        })

        const challenge = await prismaClient.deviceVerificationChallenge.create({
            data: {
                id,
                userId: input.userId,
                codeHash: hashCode(id, code),
                userAgent: input.userAgent?.slice(0, 500),
                ipAddress: input.ipAddress?.slice(0, 100),
                replaceDeviceId: input.replaceDeviceId,
                expiresAt: new Date(Date.now() + CHALLENGE_DURATION_MS),
            },
        })

        try {
            await sendCode(input.name, input.email, code)
        } catch (error) {
            await prismaClient.deviceVerificationChallenge.delete({ where: { id: challenge.id } })
            throw error
        }

        return {
            verificationRequired: true as const,
            challengeId: challenge.id,
            maskedEmail: maskEmail(input.email),
            expiresInSeconds: CHALLENGE_DURATION_MS / 1000,
            resendAfterSeconds: RESEND_INTERVAL_MS / 1000,
        }
    }

    static async verify(challengeId: string, code: string) {
        if (!/^\d{6}$/.test(code)) throw new AppError('Código inválido.', 400)

        const challenge = await prismaClient.deviceVerificationChallenge.findUnique({
            where: { id: challengeId },
            include: { user: { include: { watchLater: true } } },
        })

        if (!challenge || challenge.consumedAt || challenge.expiresAt <= new Date()) {
            throw new AppError('Código expirado. Faça login novamente.', 410)
        }
        if (challenge.attempts >= MAX_ATTEMPTS) {
            throw new AppError('Limite de tentativas atingido. Faça login novamente.', 429)
        }
        if (challenge.codeHash !== hashCode(challenge.id, code)) {
            await prismaClient.deviceVerificationChallenge.update({
                where: { id: challenge.id },
                data: { attempts: { increment: 1 } },
            })
            throw new AppError('Código incorreto.', 401)
        }

        const claimed = await prismaClient.deviceVerificationChallenge.updateMany({
            where: { id: challenge.id, consumedAt: null },
            data: { consumedAt: new Date() },
        })
        if (!claimed.count) throw new AppError('Código já utilizado.', 409)

        try {
            const device = await TrustedDeviceService.resolve({
                userId: challenge.userId,
                userAgent: challenge.userAgent ?? undefined,
                ipAddress: challenge.ipAddress ?? undefined,
                replaceDeviceId: challenge.replaceDeviceId ?? undefined,
            })
            const token = await AuthSessionService.create({
                userId: challenge.userId,
                deviceId: device.id,
                userAgent: challenge.userAgent ?? undefined,
                ipAddress: challenge.ipAddress ?? undefined,
            })

            await notifyNewDeviceConnected({
                name: challenge.user.name,
                email: challenge.user.email,
                deviceName: getDeviceName(challenge.userAgent ?? ''),
            })

            return {
                id: challenge.user.id,
                name: challenge.user.name,
                avatar: challenge.user.avatar,
                watchLater: challenge.user.watchLater,
                token,
                deviceToken: device.token,
            }
        } catch (error) {
            await prismaClient.deviceVerificationChallenge.update({
                where: { id: challenge.id },
                data: { consumedAt: null },
            })
            throw error
        }
    }

    static async resend(challengeId: string) {
        const challenge = await prismaClient.deviceVerificationChallenge.findUnique({
            where: { id: challengeId },
            include: { user: true },
        })

        if (!challenge || challenge.consumedAt || challenge.expiresAt <= new Date()) {
            throw new AppError('Confirmação expirada. Faça login novamente.', 410)
        }

        const elapsed = Date.now() - challenge.lastSentAt.getTime()
        if (elapsed < RESEND_INTERVAL_MS) {
            throw new AppError(
                `Aguarde ${Math.ceil((RESEND_INTERVAL_MS - elapsed) / 1000)} segundos para reenviar.`,
                429,
            )
        }

        const code = generateCode()
        await prismaClient.deviceVerificationChallenge.update({
            where: { id: challenge.id },
            data: {
                codeHash: hashCode(challenge.id, code),
                attempts: 0,
                lastSentAt: new Date(),
                expiresAt: new Date(Date.now() + CHALLENGE_DURATION_MS),
            },
        })
        await sendCode(challenge.user.name, challenge.user.email, code)

        return {
            maskedEmail: maskEmail(challenge.user.email),
            expiresInSeconds: CHALLENGE_DURATION_MS / 1000,
            resendAfterSeconds: RESEND_INTERVAL_MS / 1000,
        }
    }
}
