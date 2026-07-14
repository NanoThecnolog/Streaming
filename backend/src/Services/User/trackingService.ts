import prismaClient from '../../prisma';
import { BadRequestError } from '../../Utils/badRequestExtend';

interface TrackingServiceProps {
    path: string,
    userId: string,
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
    async execute({ path, userId }: TrackingServiceProps) {

        const user = await prismaClient.user.findUnique({ where: { id: userId } })
        if (!user) throw new BadRequestError('Usuário não encontrado')

        const sanitizedPath = this.sanitizePath(path)

        await prismaClient.tracking.create({
            data: {
                name: user.name,
                userId,
                path: sanitizedPath
            }
        })
        return { message: "ok" }
    }
}