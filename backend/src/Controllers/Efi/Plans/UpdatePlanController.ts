import { Request, Response } from 'express';
import { UpdatePlanService } from '../../../Services/Efi/Plans/UpdatePlanService';

export class UpdatePlanController {
    async handle(req: Request, res: Response) {
        try {
            const { id, name } = req.body;
            const updatePlanService = new UpdatePlanService();
            const plan = await updatePlanService.execute({ id, name })
            return res.status(200).json(plan)
        } catch (err: any) {
            return res.status(400).json(err)
        }
    }
}