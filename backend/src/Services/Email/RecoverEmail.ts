import prismaClient from '../../prisma';
import { apiEmail } from '../../Utils/apiMessenger';
import { createTransporter } from '../../Utils/CreateTransporter';
import { debugLog } from '../../Utils/DebugLog';

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
    async execute(user: UserProps, token: string): Promise<boolean> {
        try {
            const sendEmail = await apiEmail.post('/recover/user', {
                token,
                userName: user.name,
                userEmail: user.email
            })
            return sendEmail.data.data.accepted.length > 0 ? true : false
        } catch (err: any) {
            console.log(err)
            debugLog(`Erro ao Enviar email de recuperação. mensagem: ${err.message}`)
            return false
        }
    }
}