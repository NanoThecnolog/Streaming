import { createHash, randomBytes } from 'crypto'
import prismaClient from '../../prisma'
import { AppError } from '../../Utils/AppErrorExtend'

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000
const LAST_SEEN_UPDATE_INTERVAL_MS = 5 * 60 * 1000
const PREVIOUS_TOKEN_GRACE_MS = 60 * 1000

interface CreateSessionInput {
    userId: string
    deviceId?: string
    userAgent?: string
    ipAddress?: string
}

interface AuthenticatedSession {
    id: string
    userId: string
}

export class AuthSessionService {
    static readonly cookieMaxAgeSeconds = SESSION_DURATION_MS / 1000

    private static hashToken(token: string): string {
        return createHash('sha256').update(token).digest('hex')
    }

    private static expirationDate(): Date {
        return new Date(Date.now() + SESSION_DURATION_MS)
    }

    static async create({ userId, deviceId, userAgent, ipAddress }: CreateSessionInput): Promise<string> {
        const token = randomBytes(32).toString('base64url')

        await prismaClient.authSession.create({
            data: {
                userId,
                deviceId,
                tokenHash: this.hashToken(token),
                userAgent: userAgent?.slice(0, 500),
                ipAddress: ipAddress?.slice(0, 100),
                expiresAt: this.expirationDate(),
            },
        })

        return token
    }

    static async authenticate(token: string): Promise<AuthenticatedSession> {
        const tokenHash = this.hashToken(token)
        const session = await prismaClient.authSession.findFirst({
            where: {
                OR: [
                    { tokenHash },
                    {
                        previousTokenHash: tokenHash,
                        previousTokenExpiresAt: { gt: new Date() },
                    },
                ],
            },
            select: {
                id: true,
                userId: true,
                revokedAt: true,
                expiresAt: true,
                lastSeenAt: true,
                deviceId: true,
            },
        })

        if (!session || session.revokedAt || session.expiresAt <= new Date()) {
            throw new AppError('Sessão inválida ou expirada.', 401)
        }

        if (Date.now() - session.lastSeenAt.getTime() >= LAST_SEEN_UPDATE_INTERVAL_MS) {
            await prismaClient.authSession.update({
                where: { id: session.id },
                data: { lastSeenAt: new Date() },
            })
            if (session.deviceId) {
                await prismaClient.trustedDevice.updateMany({
                    where: { id: session.deviceId, revokedAt: null },
                    data: { lastSeenAt: new Date() },
                })
            }
        }

        return { id: session.id, userId: session.userId }
    }

    static async rotate(sessionId: string, presentedToken: string): Promise<string | null> {
        const presentedHash = this.hashToken(presentedToken)
        const nextToken = randomBytes(32).toString('base64url')
        const result = await prismaClient.authSession.updateMany({
            where: {
                id: sessionId,
                tokenHash: presentedHash,
                revokedAt: null,
                expiresAt: { gt: new Date() },
            },
            data: {
                tokenHash: this.hashToken(nextToken),
                previousTokenHash: presentedHash,
                previousTokenExpiresAt: new Date(Date.now() + PREVIOUS_TOKEN_GRACE_MS),
                lastSeenAt: new Date(),
                expiresAt: this.expirationDate(),
            },
        })

        return result.count ? nextToken : null
    }

    static async list(userId: string, currentSessionId: string) {
        const sessions = await prismaClient.authSession.findMany({
            where: { userId, revokedAt: null, expiresAt: { gt: new Date() } },
            orderBy: { lastSeenAt: 'desc' },
            select: {
                id: true,
                createdAt: true,
                lastSeenAt: true,
                expiresAt: true,
                device: { select: { id: true, name: true } },
            },
        })

        return sessions.map((session) => ({
            ...session,
            current: session.id === currentSessionId,
        }))
    }

    static async revokeOwned(userId: string, sessionId: string): Promise<void> {
        const result = await prismaClient.authSession.updateMany({
            where: { id: sessionId, userId, revokedAt: null },
            data: { revokedAt: new Date() },
        })
        if (!result.count) throw new AppError('Sessão não encontrada.', 404)
    }

    static async revokeOthers(userId: string, currentSessionId: string): Promise<void> {
        await prismaClient.authSession.updateMany({
            where: { userId, id: { not: currentSessionId }, revokedAt: null },
            data: { revokedAt: new Date() },
        })
    }

    static async revoke(sessionId: string): Promise<void> {
        await prismaClient.authSession.updateMany({
            where: { id: sessionId, revokedAt: null },
            data: { revokedAt: new Date() },
        })
    }

    static async revokeAllForUser(userId: string): Promise<void> {
        await prismaClient.authSession.updateMany({
            where: { userId, revokedAt: null },
            data: { revokedAt: new Date() },
        })
    }
}
