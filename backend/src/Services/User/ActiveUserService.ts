import prismaClient from "../../prisma";

interface ActiveRequest {
    email: string
}

class ActiveUserService {
    async execute({ email }: ActiveRequest) {

        const userExiste = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        if (!userExiste) throw new Error("Email não encontrado")
        const user = await prismaClient.user.update({
            where: { email },
            data: {
                verified: true
            }
        })
        return user
    }
}
export { ActiveUserService }