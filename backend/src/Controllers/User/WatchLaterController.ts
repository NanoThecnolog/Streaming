import { Request, Response } from "express";
import { WatchLaterService } from "../../Services/User/WatchLaterService";

class WatchLaterController {
    async handle(req: Request, res: Response) {
        try {
            const watchLaterService = new WatchLaterService();
            const { userid, title, subtitle, tmdbid } = req.body;
            const addMovie = await watchLaterService.execute({
                userid,
                title,
                subtitle,
                tmdbid
            });
            return res.json(addMovie)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao adicionar filme ou série a lista" })
        }
    }
}
export { WatchLaterController }
