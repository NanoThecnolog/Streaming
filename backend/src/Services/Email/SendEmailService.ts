import prismaClient from '../../prisma';
import nodemailer from 'nodemailer';

export class SendEmailService {
    async execute(title: string, description: string, tmdbId: number, userId: string) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        try {
            const sendingEmail = await transporter.sendMail({
                from: "Suporte - FlixNext",
                to: "contato@ericssongomes.com",
                subject: `Notificação de Problema: ${title}`,
                html: `
                <style>
                    body{
                        font-family: Arial, sans-serif;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container{
                        width: 100%;
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px;
                        border-radius: 8px 8px 0 0;
                        text-align: center;
                    }
                    h4 {
                        font-size: 16px;
                        color: #4CAF50;
                    }
                    p {
                        font-size: 14px;
                        margin-bottom: 15px;
                    }
                    .footer {
                        font-size: 12px;
                        color: #777;
                        text-align: center;
                        margin-top: 20px;
                    }
                </style>
                <div class="container">
                    <div class="header">
                        <h2>Notificação de Problema</h2>
                    </div>
                    <div>
                        <h4>Problema:</h4>
                        <p>${title}</p>
                        <h4>Descrição:</h4>
                        <p>${description}</p>
                        <h4>Id do título:</h4>
                        <p>${tmdbId}</p>
                        <h4>ID do usuário:</h4>
                        <p>${userId}</p>
                    </div>
                    <div class="footer">
                        <p>Esté é um email gerado automaticamente. Por favor, não responda.</p>
                    </div>
                </div>`
            })
            return "Email enviado!"
        } catch (err) {
            throw new Error("Erro com o envio do email")
        }
    }
}