import { Request, Response } from "express";
import { RemoveWatchLaterService } from "../../Services/User/RemoveWatchLaterService";


class RemoveWatchLaterController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const removeService = new RemoveWatchLaterService();
            const removeFilme = await removeService.execute(id as string);
            return res.json(removeFilme)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao remover filme ou série" })
        }
    }
}
export { RemoveWatchLaterController }