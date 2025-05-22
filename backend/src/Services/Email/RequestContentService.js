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
exports.RequestContentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const CreateTransporter_1 = require("../../Utils/CreateTransporter");
class RequestContentService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, userId }) {
            const userExiste = yield prisma_1.default.user.findUnique({
                where: { id: userId }
            });
            if (!userExiste)
                throw new Error("Usuário não existe!");
            const transporter = (0, CreateTransporter_1.createTransporter)();
            transporter.verify((error, success) => {
                if (error) {
                    console.log("Erro ao conectar", error);
                }
                else {
                    console.log("Conexão SMTP rodando...");
                }
            });
            try {
                yield transporter.sendMail({
                    from: `'Suporte - FlixNext'<${process.env.EMAIL_USER}>`,
                    to: "ericssongomes.fotografia@gmail.com",
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
                });
                return 'Solicitação enviada';
            }
            catch (err) {
                throw new Error("Erro com o envio da solicitação por email");
            }
        });
    }
}
exports.RequestContentService = RequestContentService;
