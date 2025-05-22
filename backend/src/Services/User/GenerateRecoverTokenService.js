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
exports.GenerateRecoverTokenService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
const RecoverEmail_1 = require("../Email/RecoverEmail");
const DebugLog_1 = require("../../Utils/DebugLog");
class GenerateRecoverTokenService {
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let sendStatus;
            const userExiste = yield prisma_1.default.user.findUnique({
                where: { email }
            });
            if (!userExiste)
                throw new Error("Usuário não encontrado");
            const secret = process.env.SECRET_JWT;
            if (!secret)
                throw new Error("Variável de ambiente não definida");
            const token = (0, jsonwebtoken_1.sign)({
                userId: userExiste.id,
                name: userExiste.name,
                email: userExiste.email
            }, secret, {
                expiresIn: '1h'
            });
            try {
                const recoverEmail = new RecoverEmail_1.RecoverAccService();
                const response = yield recoverEmail.execute(userExiste, token);
                (0, DebugLog_1.debugLog)("mensagem enviada");
                sendStatus = response;
            }
            catch (err) {
                sendStatus = "Erro ao enviar email";
                throw new Error("Erro com o envio do email");
            }
            return {
                id: userExiste.id,
                name: userExiste.name,
                email: userExiste.email,
                status: sendStatus
            };
        });
    }
}
exports.GenerateRecoverTokenService = GenerateRecoverTokenService;
