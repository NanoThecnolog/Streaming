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
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../Services/User/AuthUserService");
class AuthUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authUserService = new AuthUserService_1.AuthUserService();
                const { email, password } = req.body;
                const user = yield authUserService.execute(email, password);
                return res.json(user);
            }
            catch (err) {
                if (err instanceof Error) {
                    const status = err.statusCode || 400;
                    return res.status(status).json({ error: err.message });
                }
                return res.status(400).json({ error: "Erro ao autenticar usuário." });
            }
        });
    }
}
exports.AuthUserController = AuthUserController;
