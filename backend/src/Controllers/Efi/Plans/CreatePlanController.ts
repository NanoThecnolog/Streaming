import { Request, Response } from 'express';
import { CreatePlanService } from '../../../Services/Efi/Plans/CreatePlanService';


export class CreatePlanController {
    async handle(req: Request, res: Response) {
        try {
            const createPlanService = new CreatePlanService();
            const { name, repeats, interval } = req.body;
            const plan = await createPlanService.execute({
                name,
                repeats,
                interval
            })
            return res.status(200).json(plan)
        } catch (err) {
            if (err) {
                return res.status(400).json(err)
            }
            return res.status(400).json({ error: 'Erro ao fazer a requisição' })
        }
    }
}