import prismaClient from '../../prisma';
import { createTransporter } from '../../Utils/CreateTransporter';
import { generateEmailContent } from '../../Utils/GenerateEmailTemplates';

export class EmailInfoService {
    async execute() {
        const transporter = createTransporter();
        try {
            const users = await prismaClient.user.findMany()
            if (!users || users.length === 0) {
                throw new Error("Nenhum usuário encontrado para enviar e-mails.");
            }
            const assunto = "Nossa Casa Mudou!";
            await Promise.all(users.map(async (user) => {
                if (user.news) {
                    const html = generateEmailContent(user.name);
                    try {
                        await transporter.sendMail({
                            from: `'Informativo - FlixNext'<${process.env.EMAIL_USER}>`,
                            to: user.email,
                            subject: assunto,
                            html: html,
                        });
                    } catch (error) {
                        console.error(`Erro ao enviar e-mail para ${user.email}:`, error);
                    }
                }
            }));
            return "E-mails enviados com sucesso!";
        } catch (err) {
            console.error("Erro ao enviar e-mails:", err);
            throw new Error("Erro ao enviar email informativo.");
        }
    }
}