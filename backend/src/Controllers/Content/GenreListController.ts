import { Request, Response } from "express";
import { GenreListService } from "../../Services/Content/GenreListService";

class GenreListController {
    async handle(req: Request, res: Response) {
        try {
            const service = new GenreListService();
            const genres = await service.execute();

            console.log("[GenreList] result count:", genres?.length, "isArray:", Array.isArray(genres));

            return res.status(200).json(genres);
        } catch (err) {
            console.error("[GenreList] error:", err);
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(400).json({ error: "Erro ao listar gêneros." });
        }
    }
}

export { GenreListController };
