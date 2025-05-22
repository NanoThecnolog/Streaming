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
exports.AuthUserService = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExiste = yield prisma_1.default.user.findUnique({
                where: { email }
            });
            if (!userExiste)
                throw new Error("Email ou senha incorreto.");
            const passwordMatch = yield (0, bcrypt_1.compare)(password, userExiste.password);
            if (!passwordMatch)
                throw new Error("Email ou senha incorreto.");
            if (!userExiste.verified) {
                const err = new Error("Account not verified. Please, check your email!--");
                err.statusCode = 403;
                throw err;
            }
            //const sessionId = uuidv4()
            const secret = process.env.SECRET_JWT;
            if (!secret)
                throw new Error("Variável de ambiente não definida corretamente.");
            const token = (0, jsonwebtoken_1.sign)({
                name: userExiste.name,
                email: userExiste.email,
            }, secret, {
                subject: userExiste.id,
                expiresIn: '30d'
            });
            const watchLaterList = yield prisma_1.default.watchLater.findMany({
                where: {
                    userId: userExiste.id
                }
            });
            //const favoriteService = new ListFavoriteService();
            //const favoriteList = await favoriteService.execute(userExiste.id)
            return {
                name: userExiste.name,
                avatar: userExiste.avatar,
                watchLater: watchLaterList,
                token: token,
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
