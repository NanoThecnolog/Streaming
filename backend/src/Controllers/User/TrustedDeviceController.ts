import { Request, Response } from 'express'
import prismaClient from '../../prisma'
import { TrustedDeviceService } from '../../Services/User/TrustedDeviceService'

const errorResponse = (error: unknown, res: Response) => {
    if (error instanceof Error) {
        const status = (error as Error & { statusCode?: number }).statusCode ?? 500
        return res.status(status).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Erro interno ao gerenciar dispositivos.' })
}

export class ListTrustedDevicesController {
    async handle(req: Request, res: Response) {
        try {
            const devices = await TrustedDeviceService.list(req.user_id, req.session_id)
            return res.status(200).json({ devices })
        } catch (error) {
            return errorResponse(error, res)
        }
    }
}

export class RevokeTrustedDeviceController {
    async handle(req: Request, res: Response) {
        try {
            await TrustedDeviceService.revoke(req.user_id, req.params.id)
            return res.status(204).end()
        } catch (error) {
            return errorResponse(error, res)
        }
    }
}

export class RevokeOtherDevicesController {
    async handle(req: Request, res: Response) {
        try {
            const session = await prismaClient.authSession.findUnique({
                where: { id: req.session_id },
                select: { deviceId: true },
            })
            await TrustedDeviceService.revokeOthers(req.user_id, session?.deviceId)
            return res.status(204).end()
        } catch (error) {
            return errorResponse(error, res)
        }
    }
}
