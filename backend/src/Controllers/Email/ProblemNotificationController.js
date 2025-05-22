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
const ProblemNotificationService_1 = require("../../Services/Email/ProblemNotificationService");
class ProblemNotificationController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, userId, tmdbId, season, episode } = req.body;
                const problemNotificationService = new ProblemNotificationService_1.ProblemNotificationService();
                const sendingEmail = yield problemNotificationService.execute(title, description, Number(tmdbId), userId, Number(season), Number(episode));
                return res.json(sendingEmail);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
                return res.status(400).json({ error: 'Erro ao fazer a requisição' });
            }
        });
    }
}
exports.ProblemNotificationController = ProblemNotificationController;
