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
exports.RemoveFavoriteController = void 0;
const RemoveFavoriteService_1 = require("../../Services/User/RemoveFavoriteService");
class RemoveFavoriteController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removerFavorito = new RemoveFavoriteService_1.RemoveFavoriteService();
                const { favoriteid } = req.params;
                if (!favoriteid)
                    return res.json({ error: "ID do Favorito não recebido" });
                const remover = yield removerFavorito.execute(favoriteid);
                return res.json(remover);
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
exports.RemoveFavoriteController = RemoveFavoriteController;
