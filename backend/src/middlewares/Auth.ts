import { NextFunction, Request, Response } from "express";
import { AuthSessionService } from '../Services/User/AuthSessionService'

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
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
        return next();
    } catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ error: 'Sessão inválida ou expirada.' })
        }
        return res.status(401).json({ error: "Erro ao autenticar usuário." })
    }
}
