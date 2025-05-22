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
exports.ListWatchLaterService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListWatchLaterService {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExiste = yield prisma_1.default.user.findUnique({
                where: { id }
            });
            if (!userExiste)
                throw new Error("Usuário não encontrado");
            const lista = yield prisma_1.default.watchLater.findMany({
                where: { userId: id },
                select: {
                    id: true,
                    title: true,
                    subtitle: true,
                    tmdbid: true,
                    userId: true,
                    created_at: true,
                    updated_at: true,
                }
            });
            return lista;
        });
    }
}
exports.ListWatchLaterService = ListWatchLaterService;
