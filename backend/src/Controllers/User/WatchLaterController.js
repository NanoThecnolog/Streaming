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
exports.WatchLaterController = void 0;
const WatchLaterService_1 = require("../../Services/User/WatchLaterService");
class WatchLaterController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const watchLaterService = new WatchLaterService_1.WatchLaterService();
                const id = req.user_id;
                const { title, subtitle, tmdbid } = req.body;
                const addMovie = yield watchLaterService.execute({
                    userid: id,
                    title,
                    subtitle,
                    tmdbid
                });
                return res.json(addMovie);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
                return res.status(400).json({ error: "Erro ao adicionar filme ou série a lista" });
            }
        });
    }
}
exports.WatchLaterController = WatchLaterController;
