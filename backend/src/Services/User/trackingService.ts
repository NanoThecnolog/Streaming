import prismaClient from '../../prisma';

interface TrackingServiceProps {
    path: string,
    userId: string,
}
export class TrackingService {
    async execute({ path, userId }: TrackingServiceProps) {


        try {
            const user = await prismaClient.user.findUnique({ where: { id: userId } })
            if (!user) return { message: "User not Found!!" }

            await prismaClient.tracking.create({
                data: {
                    name: user.name,
                    userId,
                    path
                }
            })
            return { message: "ok" }
        } catch (err) {
            console.log("Erro ao salvar os dados de tracking do usuario.")
        }
    }
}