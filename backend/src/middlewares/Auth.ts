import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
}

export const Authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token inválido ou inexistente." })
    }
    const [, token] = authToken.split(" ")
    const secret = process.env.SECRET_JWT
    if (!secret) {
        throw new Error('variável de ambiente não definida')
    }
    try {
        const { sub } = verify(
            token,
            secret,
        ) as PayLoad;
        req.user_id = sub;
        return next();
    } catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ error: err.message })
        }
        return res.status(401).json({ error: "Erro ao autenticar usuário." })
    }
}