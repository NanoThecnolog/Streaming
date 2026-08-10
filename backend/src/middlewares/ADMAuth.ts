import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";
import { AuthSessionService } from '../Services/User/AuthSessionService'

export const ADMAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token inválido ou inexistente." })
    }
    const [, token] = authToken.split(" ")
    try {
        const session = await AuthSessionService.authenticate(token)
        req.user_id = session.userId
        req.session_id = session.id
        req.session_token = token

        const user = await prismaClient.user.findUnique({
            where: { id: session.userId }
        })
        if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
        if (!user.access) return res.status(403).json({ error: "Sem permissão para acessar esse recurso." })

        return next();
    } catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ error: 'Sessão inválida ou expirada.' })
        }
        return res.status(401).json({ error: "Erro ao autenticar usuário." })
    }
}
