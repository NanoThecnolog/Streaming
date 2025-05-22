import prismaClient from '../../prisma';

export class AccessService {
    async execute(id: string): Promise<boolean | null> {
        const userAccess = await prismaClient.user.findUnique({ where: { id } })

        if (!userAccess) throw new Error('User not found.')
        return userAccess.access ?? null
    }
}