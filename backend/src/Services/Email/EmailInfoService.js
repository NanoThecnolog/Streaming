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
exports.EmailInfoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const CreateTransporter_1 = require("../../Utils/CreateTransporter");
const GenerateEmailTemplates_1 = require("../../Utils/GenerateEmailTemplates");
class EmailInfoService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, CreateTransporter_1.createTransporter)();
            try {
                const users = yield prisma_1.default.user.findMany();
                if (!users || users.length === 0) {
                    throw new Error("Nenhum usuário encontrado para enviar e-mails.");
                }
                const assunto = "Nossa Casa Mudou!";
                yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    if (user.news) {
                        const html = (0, GenerateEmailTemplates_1.generateEmailContent)(user.name);
                        try {
                            yield transporter.sendMail({
                                from: `'Informativo - FlixNext'<${process.env.EMAIL_USER}>`,
                                to: user.email,
                                subject: assunto,
                                html: html,
                            });
                        }
                        catch (error) {
                            console.error(`Erro ao enviar e-mail para ${user.email}:`, error);
                        }
                    }
                })));
                return "E-mails enviados com sucesso!";
            }
            catch (err) {
                console.error("Erro ao enviar e-mails:", err);
                throw new Error("Erro ao enviar email informativo.");
            }
        });
    }
}
exports.EmailInfoService = EmailInfoService;
