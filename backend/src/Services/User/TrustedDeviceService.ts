import { createHash, randomBytes } from 'crypto'
import prismaClient from '../../prisma'
import { AppError } from '../../Utils/AppErrorExtend'

interface ResolveDeviceInput {
    userId: string
    deviceToken?: string
    userAgent?: string
    ipAddress?: string
    replaceDeviceId?: string
}

interface ResolvedDevice {
    id: string
    token: string
}

interface DeviceLimitItem {
    id: string
    name: string
    createdAt: Date
    lastSeenAt: Date
}

export class DeviceLimitError extends AppError {
    readonly code = 'DEVICE_LIMIT_REACHED'

    constructor(
        readonly devices: DeviceLimitItem[],
        readonly limit: number,
    ) {
        super('Limite de dispositivos atingido.', 409)
    }
}

const getDeviceLimit = (): number => {
    const configured = Number(process.env.MAX_TRUSTED_DEVICES)
    if (!Number.isInteger(configured) || configured < 1) return 4
    return Math.min(configured, 20)
}

const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex')

export const getDeviceName = (userAgent = ''): string => {
    const browser = /Edg\//.test(userAgent)
        ? 'Edge'
        : /Firefox\//.test(userAgent)
          ? 'Firefox'
          : /Chrome\//.test(userAgent)
            ? 'Chrome'
            : /Safari\//.test(userAgent)
              ? 'Safari'
              : 'Navegador'

    const system = /Android/.test(userAgent)
        ? 'Android'
        : /iPhone|iPad|iPod/.test(userAgent)
          ? 'iOS'
          : /Windows/.test(userAgent)
            ? 'Windows'
            : /Mac OS X/.test(userAgent)
              ? 'macOS'
              : /Linux/.test(userAgent)
                ? 'Linux'
                : 'dispositivo desconhecido'

    return `${browser} em ${system}`
}

export class TrustedDeviceService {
    static async findExisting({
        userId,
        deviceToken,
        userAgent,
        ipAddress,
    }: ResolveDeviceInput): Promise<ResolvedDevice | null> {
        if (!deviceToken) return null

        const existing = await prismaClient.trustedDevice.findFirst({
            where: {
                userId,
                tokenHash: hashToken(deviceToken),
                revokedAt: null,
            },
            select: { id: true },
        })

        if (!existing) return null

        await prismaClient.trustedDevice.update({
            where: { id: existing.id },
            data: {
                name: getDeviceName(userAgent),
                userAgent: userAgent?.slice(0, 500),
                ipAddress: ipAddress?.slice(0, 100),
                lastSeenAt: new Date(),
            },
        })
        return { id: existing.id, token: deviceToken }
    }

    static async checkCapacity(userId: string, replaceDeviceId?: string): Promise<void> {
        const devices = await prismaClient.trustedDevice.findMany({
            where: { userId, revokedAt: null },
            orderBy: { lastSeenAt: 'asc' },
            select: { id: true, name: true, createdAt: true, lastSeenAt: true },
        })
        const limit = getDeviceLimit()

        if (devices.length < limit) return
        if (!replaceDeviceId) throw new DeviceLimitError(devices, limit)
        if (!devices.some((device) => device.id === replaceDeviceId)) {
            throw new AppError('Dispositivo selecionado inválido.', 400)
        }
    }

    static async resolve({
        userId,
        deviceToken,
        userAgent,
        ipAddress,
        replaceDeviceId,
    }: ResolveDeviceInput): Promise<ResolvedDevice> {
        const existing = await this.findExisting({ userId, deviceToken, userAgent, ipAddress })
        if (existing) return existing

        return prismaClient.$transaction(async (transaction) => {
            await transaction.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${userId}))`

            const devices = await transaction.trustedDevice.findMany({
                where: { userId, revokedAt: null },
                orderBy: { lastSeenAt: 'asc' },
                select: { id: true, name: true, createdAt: true, lastSeenAt: true },
            })
            const limit = getDeviceLimit()

            if (devices.length >= limit) {
                if (!replaceDeviceId) throw new DeviceLimitError(devices, limit)

                const replacement = devices.find((device) => device.id === replaceDeviceId)
                if (!replacement) throw new AppError('Dispositivo selecionado inválido.', 400)

                const now = new Date()
                await transaction.trustedDevice.update({
                    where: { id: replacement.id },
                    data: { revokedAt: now },
                })
                await transaction.authSession.updateMany({
                    where: { userId, deviceId: replacement.id, revokedAt: null },
                    data: { revokedAt: now },
                })
            }

            const token = randomBytes(32).toString('base64url')
            const device = await transaction.trustedDevice.create({
                data: {
                    userId,
                    tokenHash: hashToken(token),
                    name: getDeviceName(userAgent),
                    userAgent: userAgent?.slice(0, 500),
                    ipAddress: ipAddress?.slice(0, 100),
                },
                select: { id: true },
            })

            return { id: device.id, token }
        })
    }

    static async list(userId: string, sessionId: string) {
        const currentSession = await prismaClient.authSession.findUnique({
            where: { id: sessionId },
            select: { deviceId: true },
        })

        const devices = await prismaClient.trustedDevice.findMany({
            where: { userId, revokedAt: null },
            orderBy: { lastSeenAt: 'desc' },
            select: {
                id: true,
                name: true,
                createdAt: true,
                lastSeenAt: true,
                ipAddress: true,
                sessions: {
                    where: { revokedAt: null, expiresAt: { gt: new Date() } },
                    select: { id: true },
                },
            },
        })

        return devices.map(({ sessions, ...device }) => ({
            ...device,
            current: device.id === currentSession?.deviceId,
            activeSessions: sessions.length,
        }))
    }

    static async revoke(userId: string, deviceId: string): Promise<void> {
        const device = await prismaClient.trustedDevice.findFirst({
            where: { id: deviceId, userId, revokedAt: null },
            select: { id: true },
        })

        if (!device) throw new AppError('Dispositivo não encontrado.', 404)

        const now = new Date()
        await prismaClient.$transaction([
            prismaClient.trustedDevice.update({
                where: { id: device.id },
                data: { revokedAt: now },
            }),
            prismaClient.authSession.updateMany({
                where: { userId, deviceId: device.id, revokedAt: null },
                data: { revokedAt: now },
            }),
        ])
    }

    static async revokeOthers(userId: string, currentDeviceId?: string | null): Promise<void> {
        if (!currentDeviceId) throw new AppError('Dispositivo atual não identificado.', 400)

        const now = new Date()
        await prismaClient.$transaction([
            prismaClient.trustedDevice.updateMany({
                where: { userId, id: { not: currentDeviceId }, revokedAt: null },
                data: { revokedAt: now },
            }),
            prismaClient.authSession.updateMany({
                where: {
                    userId,
                    revokedAt: null,
                    OR: [{ deviceId: { not: currentDeviceId } }, { deviceId: null }],
                },
                data: { revokedAt: now },
            }),
        ])
    }
}
