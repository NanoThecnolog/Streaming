import { Request, Response } from "express";
import { CreateProfileService } from "../../Services/Profile/CreateProfileService";

interface AuthenticatedRequest extends Request {
    user_id: string;
}

class CreateProfileController {
    async handle(req: Request, res: Response) {
        try {
            const { name, avatar } = req.body;
            const userId = (req as AuthenticatedRequest).user_id;
            console.log("[CreateProfile] userId:", userId, "name:", name);

            const service = new CreateProfileService();
            const profile = await service.execute({ userId, name, avatar });

            console.log("[CreateProfile] criado:", JSON.stringify(profile));
            return res.status(201).json(profile);
        } catch (err) {
            console.error("[CreateProfile] error:", err);
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: "Erro ao criar perfil." });
        }
    }
}

export { CreateProfileController };
