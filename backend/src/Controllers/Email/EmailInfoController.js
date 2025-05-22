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
exports.EmailInfoController = void 0;
const EmailInfoService_1 = require("../../Services/Email/EmailInfoService");
class EmailInfoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailInfoService = new EmailInfoService_1.EmailInfoService();
                const enviarEmail = yield emailInfoService.execute();
                return res.json(enviarEmail);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
                return res.status(400).json({ error: 'Erro ao fazer a requisição' });
            }
        });
    }
}
exports.EmailInfoController = EmailInfoController;
