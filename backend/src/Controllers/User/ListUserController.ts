import { Request, Response } from "express";
import { ListUserService } from "../../Services/User/ListUserService";

class ListUserController {
    async handle(req: Request, res: Response) {
        try {
            const listUserService = new ListUserService();
            const users = await listUserService.execute();

            return res.json(users)

        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }

        }
    }
}

export { ListUserController }