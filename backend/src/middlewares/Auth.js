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
exports.Authenticate = void 0;
const AuthSessionService_1 = require("../Services/User/AuthSessionService");
const Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        return next();
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ error: 'Sessão inválida ou expirada.' });
        }
        return res.status(401).json({ error: "Erro ao autenticar usuário." });
    }
});
exports.Authenticate = Authenticate;
