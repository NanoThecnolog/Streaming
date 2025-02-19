import prismaClient from '../../prisma';
import nodemailer from 'nodemailer';
import { createTransporter } from '../../Utils/CreateTransporter';

interface ContentRequest {
    id: number,
    userId: string
}
export class RequestContentService {
    async execute({ id, userId }: ContentRequest) {
        const userExiste = await prismaClient.user.findUnique({
            where: { id: userId }
        })
        if (!userExiste) throw new Error("Usuário não existe!")
        const transporter = createTransporter();
        try {
            await transporter.sendMail({
                from: `'Suporte - FlixNext'<${process.env.EMAIL_USER}>`,
                to: "ericssongomes.dev@gmail.com",
                subject: `Solicitação de Conteúdo`,
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
                        <h2>Solicitação de Conteúdo</h2>
                    </div>
                    <div>
                        <h4>TMDBID:</h4>
                        <p>${id}</p>
                        <h4>ID do Usuário:</h4>
                        <p>${userId}</p>
                    </div>
                    <div class="footer">
                        <p>Esté é um email gerado automaticamente. Por favor, não responda.</p>
                    </div>
                </div>`
            })
            return 'Solicitação enviada'
        } catch (err) {
            throw new Error("Erro com o envio da solicitação por email")
        }
    }
}