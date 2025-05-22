"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const Authenticate = (req, res, next) => {
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
        return next();
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ error: err.message });
        }
        return res.status(401).json({ error: "Erro ao autenticar usuário." });
    }
};
exports.Authenticate = Authenticate;
