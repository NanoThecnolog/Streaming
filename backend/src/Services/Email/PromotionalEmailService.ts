import prismaClient from '../../prisma';
import nodemailer from 'nodemailer';

export class PromotionalEmailService {
    async execute() {
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
            const users = await prismaClient.user.findMany()
            if (!users) throw new Error("Usuários não encontrados")
            users.map(async user => {

                const sendEmail = await transporter.sendMail({
                    from: `'FlixNext'<${process.env.EMAIL_USER}>`,
                    to: user.email,
                    subject: "O Mundo Invertido te Chama!",
                    html: `               
                        <body style="font-family: Arial, sans-serif; background-color: #121212; color: #fff; margin: 0; padding: 0;">
                            <div
                                style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #000; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                <div style="background-color: #000; padding: 20px; text-align: center; border-bottom: 2px solid #f4f4f4;">
                                    <h1 style="font-size: 24px; margin: 0;">O Mundo Invertido Está na FlixNext!</h1>
                                </div>
                                <div style="padding: 20px;">
                                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.iBA-BI97PIIu0XDpwnSQ2wHaLY%26pid%3DApi&f=1&ipt=43685f01a54edb944f440d2c1677d5d81cdc6b364040fab7fcfd8876dca2c807&ipo=images"
                                        alt="Stranger Things Poster" width="100%" />
                                    <p style="font-size: 16px; line-height: 1.5;">Prepare-se para enfrentar mistérios, aventuras e nostalgia. As
                                        quatro temporadas de Stranger Things já estão disponíveis na nossa plataforma dubladas!
                                    </p>
                                    <div style="display: flex; margin: 0 auto; align-items: center;">
                                        <a href="https://flixnext.vercel.app/series/serie?title=Stranger+Things" target="_blank"
                                            rel="noreferrer noopener"
                                            style="max-width: 120px;display: inline-block; padding: 10px 20px; margin: 0 auto; background-color: #f44336; color: #fff; text-decoration: none; border-radius: 5px; flex: 1;">
                                            Assista Agora
                                        </a>
                                        <a href="https://flixnext.vercel.app/catalogo" target="_blank" rel="noreferrer noopener"
                                            style="max-width: 120px;display: inline-block; padding: 10px 20px;  margin: 0 auto; background-color: #f44336; color: #fff; text-decoration: none; border-radius: 5px; flex: 1;">
                                            Ver Catálogo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </body>
                `
                })
            })
            return "Emails promocionais enviados"
        } catch (err) {
            throw new Error("Erro ao enviar email promocional")
        }
    }
}