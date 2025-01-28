import { Request, Response } from 'express';
import { CreateBilletSubService } from '../../../Services/Efi/Subscription/CreateBilletSubService';

export class CreateBilletSubController {
    async handle(req: Request, res: Response) {
        try {
            const { planId, payment, items } = req.body;
            console.log(payment)
            const createSub = new CreateBilletSubService();
            const subscription = await createSub.execute({
                planId,
                payment,
                items
            })
            return res.status(200).json(subscription)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json(err)
        }
    }
}