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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchLaterService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class WatchLaterService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userid, title, subtitle, tmdbid }) {
            const userExiste = yield prisma_1.default.user.findUnique({
                where: { id: userid }
            });
            if (!userExiste)
                throw new Error("Usuário não encontrado");
            const watchLaterList = yield prisma_1.default.watchLater.findMany({
                where: { userId: userExiste.id }
            });
            const tituloExisteNaLista = watchLaterList.some(titulo => title === titulo.title && subtitle === titulo.subtitle);
            if (tituloExisteNaLista) {
                throw new Error("Título já adicionado.");
            }
            const movieList = yield prisma_1.default.watchLater.create({
                data: {
                    title,
                    subtitle,
                    user: {
                        connect: { id: userid }
                    },
                    tmdbid
                }, select: {
                    id: true
                }
            });
            return movieList;
        });
    }
}
exports.WatchLaterService = WatchLaterService;
