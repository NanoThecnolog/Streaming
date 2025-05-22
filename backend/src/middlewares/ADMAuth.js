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
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../prisma"));
const ADMAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token inválido ou inexistente." });
    }
    const [, token] = authToken.split(" ");
    const secret = process.env.SECRET_JWT;
    if (!secret) {
        throw new Error('variável de ambiente não definida');
    }
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, secret);
        req.user_id = sub;
        const user = yield prisma_1.default.user.findUnique({
            where: { id: sub }
        });
        if (!user)
            return res.status(404).json({ error: "Usuário não encontrado." });
        if (!user.access)
            return res.status(403).json({ error: "Sem permissão para acessar esse recurso." });
        return next();
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ error: err.message });
        }
        return res.status(401).json({ error: "Erro ao autenticar usuário." });
    }
});
exports.ADMAuth = ADMAuth;
