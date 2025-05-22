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
exports.RemoveWatchLaterController = void 0;
const RemoveWatchLaterService_1 = require("../../Services/User/RemoveWatchLaterService");
class RemoveWatchLaterController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const removeService = new RemoveWatchLaterService_1.RemoveWatchLaterService();
                const removeFilme = yield removeService.execute(id);
                return res.json(removeFilme);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
                return res.status(400).json({ error: "Erro ao remover filme ou série" });
            }
        });
    }
}
exports.RemoveWatchLaterController = RemoveWatchLaterController;
