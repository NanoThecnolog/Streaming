import prismaClient from "../../prisma";
import { compare, hash } from "bcrypt";
import { JwtPayload, verify } from "jsonwebtoken";



export class RecoverService {
    async execute(token: string, newPassword: string) {

        const secret = process.env.SECRET_JWT
        if (!secret) return
        const decoded = verify(token, secret) as JwtPayload
        const userId = decoded.userId;
        const userExiste = await prismaClient.user.findUnique({
            where: { id: userId }
        })

        if (!userExiste) throw new Error("Usuário não encontrado.")
        const comparePassword = await compare(newPassword, userExiste.password)
        if (comparePassword) throw new Error("Senha igual a anterior")
        const passwordHash = await hash(newPassword, 8)
        const updateUser = await prismaClient.user.update({
            where: { id: userId },
            data: {
                password: passwordHash
            }
        })
        return {
            id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
        }
    }
}