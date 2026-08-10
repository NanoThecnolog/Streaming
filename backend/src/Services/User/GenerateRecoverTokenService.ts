import prismaClient from "../../prisma";
import nodemailer from 'nodemailer'
import { sign } from "jsonwebtoken";
import { RecoverAccService } from "../Email/RecoverEmail";
import { debugLog } from "../../Utils/DebugLog";
import { createHash } from 'crypto'


export class GenerateRecoverTokenService {
    async execute(email: string) {
        let sendStatus: string;
        const userExiste = await prismaClient.user.findUnique({
            where: { email }
        })
        if (!userExiste) return { status: 'Se o email estiver cadastrado, o link será enviado.' }

        const secret = process.env.SECRET_JWT
        if (!secret) throw new Error("Variável de ambiente não definida")

        const token = sign(
            {
                userId: userExiste.id,
                name: userExiste.name,
                email: userExiste.email,
                passwordVersion: createHash('sha256').update(userExiste.password).digest('hex'),
            },
            secret,
            {
                expiresIn: '1h'
            }
        )
        try {

            const recoverEmail = new RecoverAccService()
            const response = await recoverEmail.execute(userExiste, token)

            debugLog("mensagem enviada")

            if (!response) throw new Error('Email não enviado')

            return { status: 'Se o email estiver cadastrado, o link será enviado.' }


        } catch (err) {
            throw new Error("Erro com o envio do email")
        }



    }
}
