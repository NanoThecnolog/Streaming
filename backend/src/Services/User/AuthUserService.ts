import { compare } from "bcrypt";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import { AppError } from '../../Utils/AppErrorExtend'
import { SecurityService } from "../../classes/security";

class AuthUserService {
    async execute(email: string, password: string) {
        const secret = process.env.SECRET_JWT;
        if (!secret) throw new AppError("Variável de ambiente não definida corretamente.", 500)
        const userExiste = await prismaClient.user.findUnique({
            where: { email }
        })
        if (!userExiste) throw new AppError("Email ou senha incorreto.", 401)

        //nova validação com argon2
        const isValid = await SecurityService.verify(password, userExiste.password)
        if (!isValid.success)
            throw new AppError("Email ou senha incorreto.", 401)

        if (isValid.rehash) {
            await prismaClient.user.update({
                where: { id: userExiste.id },
                data: {
                    password: isValid.rehash
                }
            })
        }


        const token = sign(
            {
                name: userExiste.name,
                email: userExiste.email,
            },
            secret,
            {
                subject: userExiste.id,
                expiresIn: '30d'
            }
        )
        const watchLaterList = await prismaClient.watchLater.findMany({
            where: {
                userId: userExiste.id
            }
        })

        return {
            id: userExiste.id,
            name: userExiste.name,
            avatar: userExiste.avatar,
            watchLater: watchLaterList,
            token: token,
            //donator: userExiste.donator
        }
    }
}

export { AuthUserService }

