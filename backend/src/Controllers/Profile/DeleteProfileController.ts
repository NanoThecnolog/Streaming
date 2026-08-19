import { Request, Response } from "express";
import { DeleteProfileService } from "../../Services/Profile/DeleteProfileService";

interface AuthenticatedRequest extends Request {
    user_id: string;
}

class DeleteProfileController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = (req as AuthenticatedRequest).user_id;

            const service = new DeleteProfileService();
            const result = await service.execute({ profileId: id, userId });

            return res.status(200).json(result);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: "Erro ao excluir perfil." });
        }
    }
}

export { DeleteProfileController };
