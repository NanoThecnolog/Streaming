import { Request, Response } from 'express';
import { AccessService } from '../../Services/User/AccessService';

export class AccessController {
    async handle(req: Request, res: Response) {
        try {
            const id = req.user_id
            const accessService = new AccessService()
            const access = await accessService.execute(id)
            if (!access) return res.status(403).json({ access, message: 'Access denied' })
            return res.status(200).json({ access, message: 'Access permited' })
        } catch (err: unknown) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(500).json({ error: 'Server internal error', err })
        }
    }
}