import prismaClient from '../../prisma';
import nodemailer from 'nodemailer';

export class EmailInfoService {
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
                const assunto = "Nossa Casa Mudou!!"
                const html = `
<body style="font-family: Arial, sans-serif; background-color: #121212; color: #fff; margin: 0; padding: 0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
        style="background-color: #1f1f1f; padding: 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="800" cellspacing="0" cellpadding="0"
                    style="background-color: #101010; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">

                    <!-- Header Section -->
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <p style="color: white; font-size: 34px; margin: 10px 0; text-align: center;">A nossa
                                plataforma mudou de
                                endereço!
                            </p>


                        </td>
                    </tr>
                    <!-- Body Section -->
                    <tr>
                        <td style="padding: 20px; color: #d3d3d3; font-size: 16px; line-height: 1.5;">
                            <p style="color: white; font-size: 24px; font-weight: 700; margin: 0; text-align: left;">
                                Olá,
                                <strong>${user.name}</strong>!
                            </p>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                style="margin-top: 20px; padding: 15px; border-radius: 8px;">
                                <tr>
                                    <td style="font-size: 20px; font-weight: 700; color: #d3d3d3; text-align: center;">
                                        <p
                                            style="color: white; font-size: 24px; font-weight: 700; margin: 0; text-align: left;">
                                            Buscando melhorar a performance da plataforma, passamos por um processo de
                                            mudança de hospedagem e nosso site mudou.
                                        </p>
                                        <p style="font-size: 20px; margin: 20px 0; text-align: center;">
                                            Nosso novo link de acesso:
                                        </p>
                                        <a href="https://flixnext.netlify.app/"
                                            style="color: white; padding: 15px 30px; text-decoration: none; font-size: 18px; font-weight: 700;">https://flixnext.netlify.app</a>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                style="margin-top: 20px; padding: 15px; border-radius: 8px;">
                                <tr>
                                    <td style="font-size: 20px; font-weight: 700; color: #d3d3d3;">
                                        <p style="font-size: 20px; margin: 10px 0; text-align: left;">Lembrando que
                                            esse é um link temporário. Em breve revelaremos o definitivo.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer Section -->
                    <tr>
                        <td align="center" style="padding: 20px; font-size: 14px; color: #ccc;">
                            <p style="font-weight: 700;">Contribua para o nosso trabalho, faça uma doação para o nosso
                                site. Acesse a página de
                                doações da nossa plataforma para mais informações: <a
                                    href="https://flixnext.netlify.app/donate"
                                    style="color: white; text-decoration: none; font-weight: 700;">página
                                    de doação</a></p>
                            <p>
                                A FlixNext envia e-mails informativos sobre filmes e séries que possam lhe interessar.
                                Se você não quiser mais receber nossos emails, modifique as configurações da sua conta
                                <a href="https://flixnext.vercel.app/me" target="_blank"
                                    style="color: #f44336; text-decoration: none;">aqui</a>.
                            </p>
                            <p>
                                Este e-mail foi enviado de uma conta que apenas envia notificações e não pode receber
                                respostas. Por favor não responda.
                            </p>
                            <p>©2025 FlixNext</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>`
                if (user.news) {
                    const sendEmail = await transporter.sendMail({
                        from: `'Informativo - FlixNext'<${process.env.EMAIL_USER}>`,
                        to: user.email,
                        subject: assunto,
                        html: html
                    })
                }
            })
            return "Email informativo enviado"
        } catch (err) {
            throw new Error("Erro ao enviar email informativo")
        }
    }
}