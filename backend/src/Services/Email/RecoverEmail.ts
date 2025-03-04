import prismaClient from '../../prisma';
import { apiEmail } from '../../Utils/apiMessenger';
import { createTransporter } from '../../Utils/CreateTransporter';

interface UserProps {
    id: string;
    name: string;
    email: string;
    birthday: Date;
    password: string;
    donator: boolean;
    avatar: string | null;
    verified: boolean;
    news: boolean;
    access: boolean;
    resetToken: string | null;
    resetTokenExpire: Date | null;
    created_at: Date;
    updated_at: Date;
}

export class RecoverAccService {
    async execute(user: UserProps, token: string) {
        try {
            const sendEmail = await apiEmail.post('/user/recover', {
                token,
                userName: user.name,
                userEmail: user.email
            })
            return sendEmail.data.accepted.length > 0 ? 'Email enviado' : 'Email não enviado'
        } catch (err: any) {
            console.log(err)
            return `Erro ao Enviar email de recuperação. mensagem: ${err.message}`
        }
    }
}