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

                if (user.news) {
                    const sendEmail = await transporter.sendMail({
                        from: `'FlixNext'<${process.env.EMAIL_USER}>`,
                        to: user.email,
                        subject: "Nosso Assassino em série favorito chegou na Flixnext!",
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
                            <h1 style="font-size: 34px; margin: 0; color: #fff;">Dexter chegou na nossa Plataforma!</h1>
                        </td>
                    </tr>

                    <!-- Images -->
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center" style="padding: 10px;">
                                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/8b1a019595179.560d6786d1c40.jpg"
                                            alt="Dexter Poster" width="100%"
                                            style="width: 300px; height: 400px; border-radius: 10px; object-fit: cover; display: block;">
                                    </td>
                                    <td align="center" style="padding: 10px;">
                                        <img src="https://tse4.mm.bing.net/th?id=OIP.s3-ccUHvQOx8b6kIAuZN5AHaJb"
                                            alt="Dexter Pecado Original Poster" width="100%"
                                            style="width: 300px; height: 400px; border-radius: 10px; object-fit: cover; display: block;">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Text Content -->
                    <tr>
                        <td align="center" style="padding: 20px; color: #fff;">
                            <p style="font-size: 26px; line-height: 1.5;">📣 Prepare-se para um banho de tensão e
                                mistério!</p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                As séries Dexter e Dexter: Pecado Original chegaram ao FlixNext e estão prontas para te
                                prender do início ao fim. Mergulhe no universo do serial killer mais amado da TV, que
                                elimina outros assassinos em série para conter seu passageiro sombrio.
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                🔪 Dexter: Acompanhe a história original de Dexter Morgan, um analista forense que
                                trabalha para a polícia de Miami enquanto esconde um sombrio segredo. Sua luta para
                                conter seus impulsos e seguir o "Código de Harry" é eletrizante!
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                🩸 Dexter: Pecado Original: Descubra como tudo começou para o serial killer mais amado
                                de todos os tempos. Acompanhe um jovem Dexter Morgan, que precisa aprender a canalizar
                                sua escuridão conforme ele passa de estudante para assassino em série com a orientação
                                de seu pai, Harry, e seu código. Você está preparado para ver o início da jornada desse
                                anti-herói e descobrir seus próximos passos?
                            </p>
                            <p style="font-size: 16px; line-height: 1.5;">
                                🎬 Assista agora na FlixNext e descubra porque Dexter é um dos personagens mais
                                marcantes da história da TV!
                            </p>
                        </td>
                    </tr>

                    <!-- Call to Action -->
                    <tr>
                        <td align="center" style="padding: 20px; text-align: center;">
                            <!-- Tabela para centralizar e padronizar os botões -->
                            <table align="center" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                <tr>
                                    <td align="center" style="padding: 5px;">
                                        <a href="https://flixnext.vercel.app/series/serie/1405" target="_blank"
                                            style="display: inline-block; width: 200px; padding: 10px 20px; text-align: center; background-color: #f44336; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">
                                            Dexter
                                        </a>
                                    </td>
                                    <td align="center" style="padding: 5px;">
                                        <a href="https://flixnext.vercel.app/series/serie/219937" target="_blank"
                                            style="display: inline-block; width: 200px; padding: 10px 20px; text-align: center; background-color: #f44336; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">
                                            Dexter: Pecado Original
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 20px; font-size: 12px; color: #ccc;">
                            <p>
                                A FlixNext envia e-mails informativos sobre filmes e séries que possam lhe interessar.
                                Se você não quiser mais receber nossos emails, modifique as configurações da sua conta
                                <a href="https://flixnext.vercel.app/me" target="_blank"
                                    style="color: #f44336; text-decoration: none;">aqui</a>.
                            </p>                            
                            <p>
                                Este e-mail foi enviado para ${user.email} de um endereço não monitorado. Para dúvidas,
                                envie um e-mail para:
                                <a href="mailto:contato@ericssongomes.com"
                                    style="color: #f44336; text-decoration: none;">contato@ericssongomes.com</a>.
                            </p>
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
                }
            })
            return "Emails promocionais enviados"
        } catch (err) {
            throw new Error("Erro ao enviar email promocional")
        }
    }
}