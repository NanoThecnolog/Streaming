import { Request, Response } from "express";
import { DashboardService } from "../../Services/Dashboard/DashboardService";

export class DashboardController {
  async handle(req: Request, res: Response) {
    try {
      const service = new DashboardService();
      const { period } = req.query;
      //console.log(period)
      const dashboard = await service.execute(period as string);
      return res.status(200).json(dashboard);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: "Erro ao fazer a requisição" });
    }
  }

  async subscriptions(req: Request, res: Response) {
    try {
      const { search, status } = req.query;
      const service = new DashboardService();
      const subscriptions = await service.listSubscriptions(
        typeof search === "string" ? search : undefined,
        typeof status === "string" ? status : undefined,
      );
      return res.status(200).json({ subscriptions });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: "Erro ao listar assinaturas" });
    }
  }
}
