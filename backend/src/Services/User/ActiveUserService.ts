import prismaClient from "../../prisma";
import nodemailer from 'nodemailer';
import { apiEmail } from "../../Utils/apiMessenger";

interface ActiveRequest {
    id: string
}

class ActiveUserService {
    public async execute({ id }: ActiveRequest) {

        const userExiste = await prismaClient.user.findUnique({
            where: {
                id
            }
        })
        if (!userExiste) throw new Error("Usuário não encontrado")
        if (userExiste.verified) return userExiste

        const user = await prismaClient.user.update({
            where: { id },
            data: {
                verified: true
            }, select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                donator: true,
                avatar: true,
                verified: true,
                news: true,
            }
        })


        try {
            const loginLink = `${process.env.WEBSITE_LINK}/login`
            const qrCode = "data:image/png;base64,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"
            const sendEmail = await apiEmail.post('/user/confirmation', {
                name: user.name,
                loginLink,
                qrCode,
                email: user.email
            })
            if (sendEmail.data.accepted.length > 0) console.log("mensagem enviada")
            return user
        } catch (error) {
            throw new Error("Erro com o envio do email")
        }
    }
}
export { ActiveUserService }