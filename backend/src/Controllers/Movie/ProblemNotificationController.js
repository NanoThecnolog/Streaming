"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemNotificationController = void 0;
const ProblemNotificationService_1 = require("../../Services/Movie/ProblemNotificationService");
class ProblemNotificationController {
    /*private problemNotificationService: ProblemNotificationService

    constructor() {
        this.problemNotificationService = new ProblemNotificationService()
    }*/
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const problemNotificationService = new ProblemNotificationService_1.ProblemNotificationService();
                const { title, description, tmdbId, season, episode, userId } = req.body;
                if (!title || !description || !tmdbId || !userId) {
                    console.log(req.body);
                    return res.status(400).json({ error: "Campos obrigatórios estão faltando.", data: req.body });
                }
                const handleNotification = yield problemNotificationService.execute({
                    title,
                    description,
                    tmdbId,
                    season,
                    episode,
                    userId
                });
                return res.status(handleNotification.code).json(handleNotification);
            }
            catch (err) {
                console.log("Erro no controller", err);
                return res.status(500).json({
                    code: 500,
                    message: "Erro interno ao processar a requisição",
                    error: err instanceof Error ? err.message : String(err)
                });
            }
        });
    }
}
exports.ProblemNotificationController = ProblemNotificationController;
