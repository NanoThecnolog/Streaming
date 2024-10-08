import { Request, Response } from "express";
import { ListWatchLaterService } from "../../Services/User/ListWatchLaterService";

class ListWatchLaterController {
    async handle(req: Request, res: Response) {
        try {
            const listService = new ListWatchLaterService();
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: "id não definido ou ausente." })
            const list = await listService.execute(id as string)

            return res.json(list)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao buscar lista de filmes e séries" })
        }
    }
}
export { ListWatchLaterController }
