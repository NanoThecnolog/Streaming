import { Request, Response } from 'express';
import { DeletePlanService } from '../../../Services/Efi/Plans/DeletePlanService';

export class DeletePlanController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const deletePlanService = new DeletePlanService();
            const plan = await deletePlanService.execute({ id });
            return res.status(200).json(plan)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: err })
        }
    }
}