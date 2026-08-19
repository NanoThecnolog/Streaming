import { Request, Response } from "express";
import { UpdateProfilePreferencesService } from "../../Services/Profile/UpdateProfilePreferencesService";

interface AuthenticatedRequest extends Request {
    user_id: string;
}

class UpdateProfilePreferencesController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { genres } = req.body;
            const userId = (req as AuthenticatedRequest).user_id;

            const service = new UpdateProfilePreferencesService();
            const preferences = await service.execute({ profileId: id, userId, genres });

            return res.status(200).json(preferences);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: "Erro ao atualizar preferências." });
        }
    }
}

export { UpdateProfilePreferencesController };
