import { Request, Response } from "express";
import { AuthUserService } from "../../Services/User/AuthUserService";
import { DeviceLimitError } from '../../Services/User/TrustedDeviceService'

class AuthUserController {
    async handle(req: Request, res: Response) {

        try {
            const authUserService = new AuthUserService();
            const { email, password, deviceToken, replaceDeviceId } = req.body;
            const forwardedFor = req.headers['x-forwarded-for']
            const ipAddress = Array.isArray(forwardedFor)
                ? forwardedFor[0]
                : forwardedFor?.split(',')[0]?.trim() ?? req.ip
            const user = await authUserService.execute(email, password, {
                userAgent: req.get('x-client-user-agent') ?? req.get('user-agent'),
                ipAddress,
                deviceToken,
                replaceDeviceId,
            })
            if ('verificationRequired' in user) return res.status(202).json(user)
            return res.json(user)
        } catch (err) {
            if (err instanceof DeviceLimitError) {
                return res.status(err.statusCode).json({
                    code: err.code,
                    message: err.message,
                    limit: err.limit,
                    devices: err.devices,
                })
            }
            if (err instanceof Error) {
                const status = (err as any).statusCode || 400
                return res.status(status).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao autenticar usuário." })
        }
    }
}

export { AuthUserController }
