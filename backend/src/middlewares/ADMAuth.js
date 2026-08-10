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
exports.ADMAuth = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const AuthSessionService_1 = require("../Services/User/AuthSessionService");
const ADMAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token inválido ou inexistente." });
    }
    const [, token] = authToken.split(" ");
    try {
        const session = yield AuthSessionService_1.AuthSessionService.authenticate(token);
        req.user_id = session.userId;
        req.session_id = session.id;
        req.session_token = token;
        const user = yield prisma_1.default.user.findUnique({
            where: { id: session.userId }
        });
        if (!user)
            return res.status(404).json({ error: "Usuário não encontrado." });
        if (!user.access)
            return res.status(403).json({ error: "Sem permissão para acessar esse recurso." });
        return next();
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ error: 'Sessão inválida ou expirada.' });
        }
        return res.status(401).json({ error: "Erro ao autenticar usuário." });
    }
});
exports.ADMAuth = ADMAuth;
