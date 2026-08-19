import prismaClient from '../../prisma';
import { BadRequestError } from '../../Utils/badRequestExtend';

interface TrackingServiceProps {
    path: string,
    userId: string,
    profileId?: string,
}
export class TrackingService {
    private sanitizePath(path: string) {
        const [pathname, queryString] = path.split('?')

        if (!queryString) return pathname

        const params = new URLSearchParams(queryString)

        params.delete('startTime')

        const sanitizedQuery = params.toString()

        return sanitizedQuery
            ? `${pathname}?${sanitizedQuery}`
            : pathname
    }
    async execute({ path, userId, profileId }: TrackingServiceProps) {

        const user = await prismaClient.user.findUnique({ where: { id: userId } })
        if (!user) throw new BadRequestError('Usuário não encontrado')

        const profile = profileId
            ? await prismaClient.profile.findUnique({ where: { id: profileId } })
            : null

        const sanitizedPath = this.sanitizePath(path)

        await prismaClient.tracking.create({
            data: {
                name: profile?.name ?? user.name,
                userId,
                profileId: profileId ?? null,
                path: sanitizedPath
            }
        })
        return { message: "ok" }
    }
}