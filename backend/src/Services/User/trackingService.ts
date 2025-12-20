import prismaClient from '../../prisma';
import { BadRequestError } from '../../Utils/badRequestExtend';

interface TrackingServiceProps {
    path: string,
    userId: string,
}
export class TrackingService {
    async execute({ path, userId }: TrackingServiceProps) {

        const user = await prismaClient.user.findUnique({ where: { id: userId } })
        if (!user) throw new BadRequestError('Usuário não encontrado')

        await prismaClient.tracking.create({
            data: {
                name: user.name,
                userId,
                path
            }
        })
        return { message: "ok" }
    }
}