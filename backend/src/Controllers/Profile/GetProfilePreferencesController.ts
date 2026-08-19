import { Request, Response } from "express";
import { GetProfilePreferencesService } from "../../Services/Profile/GetProfilePreferencesService";

interface AuthenticatedRequest extends Request {
    user_id: string;
}

class GetProfilePreferencesController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = (req as AuthenticatedRequest).user_id;

            const service = new GetProfilePreferencesService();
            const preferences = await service.execute({ profileId: id, userId });

            return res.status(200).json(preferences);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: "Erro ao buscar preferências." });
        }
    }
}

export { GetProfilePreferencesController };
