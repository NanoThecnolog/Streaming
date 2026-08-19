import { Request, Response } from "express";
import { EditProfileService } from "../../Services/Profile/EditProfileService";

interface AuthenticatedRequest extends Request {
    user_id: string;
}

class EditProfileController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, avatar } = req.body;
            const userId = (req as AuthenticatedRequest).user_id;

            const service = new EditProfileService();
            const profile = await service.execute({ profileId: id, userId, name, avatar });

            return res.status(200).json(profile);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: "Erro ao editar perfil." });
        }
    }
}

export { EditProfileController };
