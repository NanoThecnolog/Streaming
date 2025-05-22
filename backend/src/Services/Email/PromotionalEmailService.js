"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalEmailService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const CreateTransporter_1 = require("../../Utils/CreateTransporter");
class PromotionalEmailService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, CreateTransporter_1.createTransporter)();
            try {
                const users = yield prisma_1.default.user.findMany();
                if (!users)
                    throw new Error("Usuários não encontrados");
                users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    const assunto = "Muita Novidade e Diversão para o seu 2025!";
                    const html = `<body style="font-family: Arial, sans-serif; background-color: #121212; color: #fff; margin: 0; padding: 0;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                    style="background-color: #1f1f1f; padding: 20px;">
                                    <tr>
                                        <td align="center">
                                            <table role="presentation" width="800" cellspacing="0" cellpadding="0"
                                                style="background-color: #101010; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">

                                                <!-- Header Section -->
                                                <tr>
                                                    <td align="center" style="padding: 20px;">

                                                        <h1 style="margin: 0; font-size: 24px; color: white;">Feliz Ano Novo!!
                                                            🎉</h1>
                                                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fchinese-happy-new-year-2025-600nw-2529645459.jpg&f=1&nofb=1&ipt=36dd6b0505877c7ef8ef4a618db7034d2ebd873ff23e6fbb323061e1732b4fdd&ipo=images"
                                                            alt="Feliz Ano novo" style="width: 100%; border-radius: 2rem;">
                                                    </td>
                                                </tr>

                                                <!-- Body Section -->
                                                <tr>
                                                    <td style="padding: 20px; color: #d3d3d3; font-size: 16px; line-height: 1.5;">
                                                        <p style="font-size: 24px; font-weight: 700; margin: 0; text-align: left;">Olá,
                                                            <strong>${user.name}</strong>!
                                                        </p>
                                                        <p style="font-size: 20px; margin: 10px 0; text-align: center;">O ano mal começou e já tem
                                                            muita novidade
                                                            chegando! Descubra os novos filmes e séries que estão vindo de todos os lugares pra começar 2025 com o
                                                            pé direito!
                                                        </p>
                                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                            style="margin-top: 20px; padding: 15px; border-radius: 8px;">
                                                            <tr>
                                                                <td style="font-size: 20px; font-weight: 700; color: #d3d3d3;">
                                                                    <h2 style="margin: 10px 0;">Novidades em Séries:</h2>
                                                                    <a href="https://flixnext.vercel.app/series/serie/85271"><img
                                                                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sgCHdBJ1w0vJNUrW1Sq90KEXv9j.jpg"
                                                                            alt="WandaVision" style="max-width: 350px; border-radius: 2rem;">
                                                                    </a>
                                                                    <a href="https://flixnext.vercel.app/series/serie/95396"><img
                                                                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d09X5AzxBq4GkHL6j8pmkDPySfA.jpg"
                                                                            alt="Ruptura" style="max-width: 350px; border-radius: 2rem;"></a>
                                                                    <a href="https://flixnext.vercel.app/series/serie/118906"><img
                                                                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kWllPMxt5pbtW4Rx0XbgbhcYGmP.jpg"
                                                                            alt="Universos Paralelos"
                                                                            style="max-width: 350px; border-radius: 2rem;"></a>
                                                                    <a href="https://flixnext.vercel.app/series/serie/241259"><img
                                                                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fJQhUBShLBPSKNzcGg1tf0kHMyo.jpg"
                                                                            alt="Bebê Rena" style="max-width: 350px; border-radius: 2rem;">
                                                                    </a>
                                                                    <p style="margin: 0; text-align: center; padding-top: 20px;">
                                                                        <a href="https://flixnext.vercel.app/series"
                                                                            style="text-decoration: none;color: #d3d3d3;">📺 Assista essas e muitas
                                                                            outras séries na FlixNext!</a>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" style="padding: 20px;">
                                                                    <a href="https://flixnext.vercel.app/series"
                                                                        style="background-color: #921d1d; color: white; padding: 15px 30px; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 5px;">Assista
                                                                        Agora</a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                                            style="margin-top: 20px; padding: 15px; border-radius: 8px;">
                                                            <tr>
                                                                <td style="font-size: 20px; font-weight: 700; color: #d3d3d3;">
                                                                    <h2 style="margin: 10px 0;">Novidades em Filmes:</h2>
                                                                    <a href="https://flixnext.vercel.app/watch/1156593"><img
                                                                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bYGXiAHUQqSp8SW3ql2lleZxQ5n.jpg"
                                                                            alt="Filme Sua Culpa" style="max-width: 350px; border-radius: 2rem;">
                                                                    </a>
                                                                    <a href="https://flixnext.vercel.app/watch/558449"><img
                                                                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/342bly9MqveL65TnEFzx8TTUxcL.jpg"
                                                                            alt="Filme Gladiador 2"
                                                                            style="max-width: 350px; border-radius: 2rem;"></a>
                                                                    <a href="https://flixnext.vercel.app/watch/845781"><img
                                                                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zX2UeAmF8XDBJM3sZ0RS0jLQ8Gg.jpg"
                                                                            alt="Filme Operação Natal"
                                                                            style="max-width: 350px; border-radius: 2rem;"></a>
                                                                    <a href="https://flixnext.vercel.app/watch/533535"><img
                                                                            src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
                                                                            alt="Filme Deadpool & Wolverine"
                                                                            style="max-width: 350px; border-radius: 2rem;">
                                                                    </a>
                                                                    <p style="margin: 0; text-align: center; padding-top: 20px;">
                                                                        <a href="https://flixnext.vercel.app/#filmes"
                                                                            style="text-decoration: none;color: #d3d3d3;">🎞️ Assista esses filmes e
                                                                            muito
                                                                            mais!</a>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" style="padding: 20px;">
                                                                    <a href="https://flixnext.vercel.app/#filmes"
                                                                        style="background-color: #921d1d; color: white; padding: 15px 30px; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 5px;">Assista
                                                                        Agora</a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>

                                                <!-- Footer Section -->
                                                <tr>
                                                    <td align="center" style="padding: 20px; font-size: 14px; color: #ccc;">
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
                            </body>`;
                    if (user.news) {
                        const sendEmail = yield transporter.sendMail({
                            from: `'FlixNext'<${process.env.EMAIL_USER}>`,
                            to: user.email,
                            subject: assunto,
                            html: html
                        });
                    }
                }));
                return "Emails promocionais enviados";
            }
            catch (err) {
                throw new Error("Erro ao enviar email promocional");
            }
        });
    }
}
exports.PromotionalEmailService = PromotionalEmailService;
