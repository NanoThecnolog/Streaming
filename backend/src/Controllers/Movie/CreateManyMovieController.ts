import { Request, Response } from "express";
import { CreateManyMovieService } from "../../Services/Movie/CreateManyMovieService";

class CreateManyMovieController {
    async handle(req: Request, res: Response) {
        try {
            const createManyService = new CreateManyMovieService();
            const { data } = req.body;
            const movies = createManyService.execute({ data });
            return res.json(movies)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro durante cadastro de filmes" })
        }
    }
}

export { CreateManyMovieController }