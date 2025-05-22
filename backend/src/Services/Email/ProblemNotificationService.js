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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemNotificationService = void 0;
const CreateTransporter_1 = require("../../Utils/CreateTransporter");
class ProblemNotificationService {
    execute(title, description, tmdbId, userId, season, episode) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, CreateTransporter_1.createTransporter)();
            try {
                yield transporter.sendMail({
                    from: `'Suporte - FlixNext'<${process.env.EMAIL_USER}>`,
                    to: "ericssongomes.fotografia@gmail.com",
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
                        <h4>Temporada:</h4>
                        <p>${season ? season : 'não é uma série'}</p>
                        <h4>Episódio:</h4>
                        <p>${episode ? episode : 'não é uma série'}</p>
                        <h4>ID do usuário:</h4>
                        <p>${userId}</p>
                    </div>
                    <div class="footer">
                        <p>Esté é um email gerado automaticamente. Por favor, não responda.</p>
                    </div>
                </div>`
                });
                return "Email enviado!";
            }
            catch (err) {
                throw new Error("Erro com o envio do email");
            }
        });
    }
}
exports.ProblemNotificationService = ProblemNotificationService;
