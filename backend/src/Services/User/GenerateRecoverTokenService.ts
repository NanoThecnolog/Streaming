import prismaClient from "../../prisma";
import nodemailer from 'nodemailer'
import { sign } from "jsonwebtoken";
import { RecoverAccService } from "../Email/RecoverEmail";
import { debugLog } from "../../Utils/DebugLog";


export class GenerateRecoverTokenService {
    async execute(email: string) {
        let sendStatus: string;
        const userExiste = await prismaClient.user.findUnique({
            where: { email }
        })
        if (!userExiste) throw new Error("Usuário não encontrado")

        const secret = process.env.SECRET_JWT
        if (!secret) throw new Error("Variável de ambiente não definida")

        const token = sign(
            {
                userId: userExiste.id,
                name: userExiste.name,
                email: userExiste.email
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

            if (!response) return {
                id: userExiste.id,
                name: userExiste.name,
                email: userExiste.email,
                status: "Email não enviado"
            }

            return {
                id: userExiste.id,
                name: userExiste.name,
                email: userExiste.email,
                status: "Email enviado"
            }


        } catch (err) {
            throw new Error("Erro com o envio do email")
        }



    }
}