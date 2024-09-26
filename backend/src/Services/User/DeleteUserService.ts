import prismaClient from "../../prisma";

interface UserProps {
    id: string
}

class DeleteUserService {
    async execute({ id }: UserProps) {

        const userExiste = await prismaClient.user.findUnique({
            where: { id }
        })
        if (!userExiste) throw new Error("Usuário não encontrado!")

        const userDelete = await prismaClient.user.delete({
            where: { id: id }
        })
        return userDelete
    }
}
export { DeleteUserService }