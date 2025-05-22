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
exports.ListWatchLaterController = void 0;
const ListWatchLaterService_1 = require("../../Services/User/ListWatchLaterService");
class ListWatchLaterController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listService = new ListWatchLaterService_1.ListWatchLaterService();
                const id = req.user_id;
                if (!id)
                    return res.status(400).json({ error: "id não definido ou ausente." });
                const list = yield listService.execute(id);
                return res.json(list);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
                return res.status(400).json({ error: "Erro ao buscar lista de filmes e séries" });
            }
        });
    }
}
exports.ListWatchLaterController = ListWatchLaterController;
