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
exports.DetailUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const [user, watchLaterList] = yield Promise.all([
                prisma_1.default.user.findUniqueOrThrow({
                    where: { id: id }
                }),
                prisma_1.default.watchLater.findMany({
                    where: { userId: id },
                    select: {
                        id: true,
                        title: true,
                        subtitle: true,
                        tmdbid: true,
                        userId: true,
                        created_at: true,
                    }
                })
            ]);
            return {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                verified: user.verified,
                birthday: user.birthday,
                news: user.news,
                watchLater: watchLaterList,
                createdAt: user.created_at
            };
        });
    }
}
exports.DetailUserService = DetailUserService;
