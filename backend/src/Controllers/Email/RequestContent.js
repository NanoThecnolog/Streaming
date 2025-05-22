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
exports.RequestContentController = void 0;
const RequestContentService_1 = require("../../Services/Email/RequestContentService");
class RequestContentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user_id;
                if (!user)
                    res.status(401).json({ erro: "Usuário não autenticado ou autenticação inválida." });
                const { tmdbId } = req.body;
                const requestService = new RequestContentService_1.RequestContentService();
                const requestEmail = yield requestService.execute({
                    id: Number(tmdbId),
                    userId: user
                });
                return res.json(requestEmail);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
                return res.status(err.status).json({ error: 'Erro ao fazer a requisição de conteúdo' });
            }
        });
    }
}
exports.RequestContentController = RequestContentController;
