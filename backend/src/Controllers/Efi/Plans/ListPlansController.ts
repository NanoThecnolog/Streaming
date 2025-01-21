import { Request, Response } from 'express';
import { ListPlanService } from '../../../Services/Efi/Plans/ListPlansService';

export class ListPlanController {
    async handle(req: Request, res: Response) {
        try {
            const { name, limit, offset } = req.body;
            const listPlanService = new ListPlanService()
            const plans = await listPlanService.execute({
                name,
                limit: Number(limit),
                offset: Number(offset)
            })
            return res.status(200).json(plans)
        } catch (err) {
            if (err) {
                return res.status(400).json(err)
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}