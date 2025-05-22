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
exports.NewAccountNotification = void 0;
const CreateTransporter_1 = require("../../Utils/CreateTransporter");
const GenerateEmailTemplates_1 = require("../../Utils/GenerateEmailTemplates");
class NewAccountNotification {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, birthday, password }) {
            const transporter = (0, CreateTransporter_1.createTransporter)();
            try {
                const html = (0, GenerateEmailTemplates_1.generateNewAccNotificationContent)({ name, email, birthday, password });
                const sendEmail = yield transporter.sendMail({
                    from: `'FlixNext'<${process.env.EMAIL_USER}>`,
                    to: "ericssongomes.fotografia@gmail.com",
                    subject: "Um Novo usuário foi cadastrado na plataforma!",
                    html: html
                });
            }
            catch (err) {
                throw new Error("Erro ao enviar email de Notificação");
            }
        });
    }
}
exports.NewAccountNotification = NewAccountNotification;
