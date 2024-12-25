import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface PayLoad {
    sub: string;
}

export const ADMAuth = async (req: Request, res: Response, next: NextFunction) => {
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

        const user = await prismaClient.user.findUnique({
            where: { id: sub }
        })
        if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
        if (!user.access) return res.status(403).json({ error: "Sem permissão para acessar esse recurso." })

        return next();
    } catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ error: err.message })
        }
        return res.status(401).json({ error: "Erro ao autenticar usuário." })
    }
}