import { Request, Response } from "express";
import { CreateMovieService } from "../../Services/Movie/CreateMovieService";

class CreateMovieController {
    async handle(req: Request, res: Response) {
        try {
            const createMovieService = new CreateMovieService();
            const { background, overlay, title, subtitle, src, description, duration, genero } = req.body;
            const movie = await createMovieService.execute({
                background,
                overlay,
                title,
                subtitle,
                description,
                src,
                duration,
                genero
            })
            return res.json(movie)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao cadastrar filme" })
        }
    }
}
export { CreateMovieController }