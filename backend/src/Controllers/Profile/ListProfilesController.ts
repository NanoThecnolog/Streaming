import { Request, Response } from "express";
import { ListProfilesService } from "../../Services/Profile/ListProfilesService";

interface AuthenticatedRequest extends Request {
    user_id: string;
}

class ListProfilesController {
    async handle(req: Request, res: Response) {
        try {
            const userId = (req as AuthenticatedRequest).user_id;
            console.log("[ListProfiles] userId:", userId);

            const service = new ListProfilesService();
            const profiles = await service.execute(userId);

            console.log("[ListProfiles] result:", JSON.stringify(profiles));
            console.log("[ListProfiles] isArray:", Array.isArray(profiles), "length:", profiles?.length);

            return res.status(200).json(profiles);
        } catch (err) {
            console.error("[ListProfiles] error:", err);
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: "Erro ao listar perfis." });
        }
    }
}

export { ListProfilesController };
