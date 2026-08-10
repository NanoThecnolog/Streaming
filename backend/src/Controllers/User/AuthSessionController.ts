import { Request, Response } from 'express'
import { AuthSessionService } from '../../Services/User/AuthSessionService'

const errorResponse = (error: unknown, res: Response) => {
    if (error instanceof Error) {
        const status = (error as Error & { statusCode?: number }).statusCode ?? 500
        return res.status(status).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Erro interno ao gerenciar sessões.' })
}

export class LogoutController {
    async handle(req: Request, res: Response) {
        await AuthSessionService.revoke(req.session_id)
        return res.status(204).end()
    }
}

export class RefreshSessionController {
    async handle(req: Request, res: Response) {
        try {
            const token = await AuthSessionService.rotate(req.session_id, req.session_token)
            return res.status(200).json({ token })
        } catch (error) {
            return errorResponse(error, res)
        }
    }
}

export class ListSessionsController {
    async handle(req: Request, res: Response) {
        try {
            const sessions = await AuthSessionService.list(req.user_id, req.session_id)
            return res.status(200).json({ sessions })
        } catch (error) {
            return errorResponse(error, res)
        }
    }
}

export class RevokeSessionController {
    async handle(req: Request, res: Response) {
        try {
            await AuthSessionService.revokeOwned(req.user_id, req.params.id)
            return res.status(204).end()
        } catch (error) {
            return errorResponse(error, res)
        }
    }
}

export class RevokeOtherSessionsController {
    async handle(req: Request, res: Response) {
        try {
            await AuthSessionService.revokeOthers(req.user_id, req.session_id)
            return res.status(204).end()
        } catch (error) {
            return errorResponse(error, res)
        }
    }
}
