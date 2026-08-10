import { Request, Response } from 'express'
import { DeviceVerificationService } from '../../Services/User/DeviceVerificationService'

const handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
        const status = (error as Error & { statusCode?: number }).statusCode ?? 500
        return res.status(status).json({ error: error.message, message: error.message })
    }
    return res.status(500).json({ message: 'Erro interno ao confirmar dispositivo.' })
}

export class VerifyDeviceController {
    async handle(req: Request, res: Response) {
        try {
            const { challengeId, code } = req.body
            if (!challengeId || !code) return res.status(400).json({ message: 'Código obrigatório.' })
            const result = await DeviceVerificationService.verify(challengeId, code)
            return res.status(200).json(result)
        } catch (error) {
            return handleError(error, res)
        }
    }
}

export class ResendDeviceCodeController {
    async handle(req: Request, res: Response) {
        try {
            const { challengeId } = req.body
            if (!challengeId) return res.status(400).json({ message: 'Confirmação inválida.' })
            const result = await DeviceVerificationService.resend(challengeId)
            return res.status(200).json(result)
        } catch (error) {
            return handleError(error, res)
        }
    }
}
