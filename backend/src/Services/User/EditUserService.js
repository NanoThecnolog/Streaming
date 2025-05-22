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
exports.EditUserService = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = __importDefault(require("../../prisma"));
class EditUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, avatar, password, birthday, news }) {
            const userExiste = yield prisma_1.default.user.findUnique({
                where: { id }
            });
            if (!userExiste)
                throw new Error("Usuário não existe.");
            let passwordHash;
            if (password) {
                passwordHash = yield (0, bcrypt_1.hash)(password, 8);
            }
            const editUser = yield prisma_1.default.user.update({
                where: { id },
                data: {
                    name: name !== null && name !== void 0 ? name : userExiste.name,
                    avatar: avatar !== null && avatar !== void 0 ? avatar : userExiste.avatar,
                    password: passwordHash !== null && passwordHash !== void 0 ? passwordHash : userExiste.password,
                    birthday: birthday !== null && birthday !== void 0 ? birthday : userExiste.birthday,
                    news: news !== null && news !== void 0 ? news : userExiste.news
                }, select: {
                    name: true,
                    email: true,
                    avatar: true,
                    birthday: true,
                    news: true,
                    verified: true,
                    created_at: true,
                    watchLater: true
                }
            });
            return editUser;
        });
    }
}
exports.EditUserService = EditUserService;
