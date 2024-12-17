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
                                <div
        style="max-width: 1000px; margin: 20px auto; padding: 20px; background-color: #000; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #000; padding: 20px; text-align: center;">
            <h1 style="font-size: 34px; margin: 0;">Dexter chegou na nossa Plataforma!</h1>
        </div>
        <div style="padding: 20px;">
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2F1400%2F8b1a019595179.560d6786d1c40.jpg&f=1&nofb=1&ipt=081710b244e9f120f2780a6a4b3899b2cfb0553f392c50c2d509050b1d03b1f0&ipo=images"
                    alt="Dexter Poster"
                    style="width: 45%; aspect-ratio: 0.8; object-fit: cover; border-radius: 10px;" />
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.s3-ccUHvQOx8b6kIAuZN5AHaJb%26pid%3DApi&f=1&ipt=9944d674dd569edc07d4b75f4e822852ac1e64b020bf1d833c50a342ea9f286b&ipo=images"
                    alt="Dexter Pecado Original Poster"
                    style="width: 45%; aspect-ratio: 0.8; object-fit: cover; border-radius: 10px;" />
            </div>
            <div style="padding: 40px 0;">
                <p style="font-size: 26px; line-height: 1.5;">📣 Prepare-se para um banho de tensão e mistério!</p>
                <p>
                    As séries Dexter e Dexter: Pecado Original chegaram ao FlixNext e estão prontas para te prender do
                    início ao fim. Mergulhe no universo do serial killer mais amado da TV, que elimina outros assassinos
                    em série para conter seu passageiro sombrio.
                </p>

                <p>
                    🔪 Dexter: Acompanhe a história original de Dexter Morgan, um analista forense que trabalha para a
                    polícia de Miami enquanto esconde um sombrio segredo. Sua luta para conter seus impulsos e seguir o
                    "Código de Harry" é eletrizante!
                </p>

                <p>
                    🩸 Dexter: Pecado Original: Descubra como tudo começou para o serial killer mais amado de todos os
                    tempos. Acompanhe um jovem Dexter Morgan, que precisa aprender a canalizar sua escuridão conforme
                    ele passa de estudante para assassino em série com a orientação de seu pai, Harry, e seu código.
                    Você está preparado para ver o início da jornada desse anti-herói e descobrir seus próximos passos?
                </p>

                <p>
                    🎬 Assista agora na FlixNext e descubra porque Dexter é um dos personagens mais marcantes da
                    história da
                    TV!
                </p>
            </div>
            <div style="display: flex; margin: 0 auto; align-items: center;">
                <div
                    style="background-color: #f44336; border-radius: 5px; margin: auto; display: flex; justify-content: center; align-items: center;">
                    <a href="https://flixnext.vercel.app/series/serie/1405" target="_blank" rel="noreferrer noopener"
                        style="min-width: 150px; min-height: 40px; line-height: 30px; display: inline-block; text-align: center; padding: 10px 20px; color: #fff; text-decoration: none;">
                        Dexter
                    </a>
                </div>
                <div style="background-color: #f44336; border-radius: 5px; margin: auto;">
                    <a href="https://flixnext.vercel.app/series/serie/219937" target="_blank" rel="noreferrer noopener"
                        style="min-width: 150px; min-height: 40px; line-height: 30px; display: inline-block; text-align: center; padding: 10px 20px; color: #fff; text-decoration: none;">
                        Dexter: Pecado Original
                    </a>
                </div>
            </div>
            <div style="text-align: center; padding: 50px 150px 10px 150px; font-size: .8rem;">
                <p>
                    A FlixNext envia e-mails informativos sobre filmes e séries que possam lhe interessar. Sabemos
                    que você é uma pessoa ocupada e por isso limitamos nossos e-mails a notícias relevantes e
                    informações importantes sobre sua conta. Se você não quiser mais receber nossos emails,
                    modifique as configurações da sua conta <a href="https://flixnext.vercel.app/me" target="_blank"
                        rel="noreferrer noopener" style="text-decoration: none; color: #f44336">aqui</a>.
                </p>

                <p>
                    Esta mensagem foi enviada a você pela equipe da FlixNext.
                </p>                
                <p>
                    Este e-mail foi enviado para ${user.email} de um endereço não monitorado. Não responda a esta
                    mensagem. Se você tiver dúvidas e quiser entrar em contato conosco, envie um email para: <a
                        href="mailto:contato@ericssongomes.com" target="_blank" rel="noreferrer noopener"
                        style="text-decoration: none; color: #f44336;">contato@ericssongomes.com</a>.
                </p>
                <p>
                    ©2024 FlixNext
                </p>
            </div>
        </div>
    </div>
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