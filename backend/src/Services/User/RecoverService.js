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
exports.RecoverService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class RecoverService {
    execute(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.SECRET_JWT;
            if (!secret)
                return;
            const decoded = (0, jsonwebtoken_1.verify)(token, secret);
            const userId = decoded.userId;
            const userExiste = yield prisma_1.default.user.findUnique({
                where: { id: userId }
            });
            if (!userExiste)
                throw new Error("Usuário não encontrado.");
            const comparePassword = yield (0, bcrypt_1.compare)(newPassword, userExiste.password);
            if (comparePassword)
                throw new Error("Senha igual a anterior");
            const passwordHash = yield (0, bcrypt_1.hash)(newPassword, 8);
            const updateUser = yield prisma_1.default.user.update({
                where: { id: userId },
                data: {
                    password: passwordHash
                }
            });
            return {
                id: updateUser.id,
                name: updateUser.name,
                email: updateUser.email,
            };
        });
    }
}
exports.RecoverService = RecoverService;
