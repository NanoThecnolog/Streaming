import prismaClient from '../../prisma'

const RETENTION_MS = 30 * 24 * 60 * 60 * 1000

export class SecurityCleanupService {
    static async execute(): Promise<void> {
        const now = new Date()
        const retentionLimit = new Date(Date.now() - RETENTION_MS)

        await prismaClient.$transaction([
            prismaClient.authSession.deleteMany({
                where: {
                    OR: [
                        { expiresAt: { lt: now } },
                        { revokedAt: { lt: retentionLimit } },
                    ],
                },
            }),
            prismaClient.deviceVerificationChallenge.deleteMany({
                where: {
                    OR: [
                        { expiresAt: { lt: retentionLimit } },
                        { consumedAt: { lt: retentionLimit } },
                    ],
                },
            }),
        ])
    }
}
