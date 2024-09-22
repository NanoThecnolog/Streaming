import { Request, Response } from "express";
import { ListMoviesService } from "../../Services/Movie/ListMoviesServices";

class ListMoviesController {
    async handle(req: Request, res: Response) {
        try {
            const listMoviesService = new ListMoviesService();
            const movies = await listMoviesService.execute()
            return res.json(movies)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Error ao buscar filmes." })
        }
    }
}

export { ListMoviesController }