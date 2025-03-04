import { createTransporter } from '../../Utils/CreateTransporter';
import { generateNewAccNotificationContent } from '../../Utils/GenerateEmailTemplates';

interface DataProps {
    name: string,
    email: string,
    birthday: Date,
    password: string
}

export class NewAccountNotification {
    async execute({ name, email, birthday, password }: DataProps) {
        const transporter = createTransporter();
        try {
            const html = generateNewAccNotificationContent({ name, email, birthday, password })
            const sendEmail = await transporter.sendMail({
                from: `'FlixNext'<${process.env.EMAIL_USER}>`,
                to: "ericssongomes.fotografia@gmail.com",
                subject: "Um Novo usuário foi cadastrado na plataforma!",
                html: html
            })
        } catch (err) {
            throw new Error("Erro ao enviar email de Notificação")
        }
    }
}