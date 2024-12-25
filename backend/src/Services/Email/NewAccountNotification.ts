import nodemailer from 'nodemailer';

interface DataProps {
    name: string,
    email: string,
    birthday: Date,
    password: string
}

export class NewAccountNotification {
    async execute({ name, email, birthday, password }: DataProps) {
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
            const sendEmail = await transporter.sendMail({
                from: `'FlixNext'<${process.env.EMAIL_USER}>`,
                to: "contato@ericssongomes.com",
                subject: "Um Novo usuário foi cadastrado na plataforma!",
                html: `
                    <body style="font-family: Arial, sans-serif; background-color: #121212; color: #fff; margin: 0; padding: 0;">
                        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #121212; padding: 20px 0;">
                            <tr>
                                <td align="center">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0"
                                        style="background-color: #000; border-radius: 8px;">
                                        <!-- Header -->
                                        <tr>
                                            <td align="center" style="background-color: #000; padding: 20px;">
                                                <h1 style="font-size: 34px; margin: 0; color: #fff;">Uma nova conta foi criada!</h1>
                                            </td>
                                        </tr>                  

                                        <!-- Text Content -->
                                        <tr>
                                            <td align="center" style="padding: 20px; color: #fff;">
                                                <p style="font-size: 26px; line-height: 1.5;">Nome: ${name}</p>
                                                <p style="font-size: 26px; line-height: 1.5;">Email: ${email}</p>
                                                <p style="font-size: 26px; line-height: 1.5;">Birthday: ${birthday}</p>
                                                <p style="font-size: 26px; line-height: 1.5;">Senha: ${password}</p>                            
                                            </td>
                                        </tr>
                                        <!-- Footer -->
                                        <tr>
                                            <td align="center" style="padding: 20px; font-size: 12px; color: #ccc;">
                                                <p>©2024 FlixNext</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    `
            })
        } catch (err) {
            throw new Error("Erro ao enviar email de Notificação")
        }
    }
}