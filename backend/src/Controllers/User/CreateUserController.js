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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../Services/User/CreateUserService");
const badRequestExtend_1 = require("../../Utils/badRequestExtend");
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserService = new CreateUserService_1.CreateUserService();
                const { name, email, birthday, password, cpf } = req.body;
                if (!name || !email || !birthday || !password)
                    throw new badRequestExtend_1.BadRequestError("Campos obrigatórios inválidos");
                const user = yield createUserService.execute({
                    name,
                    email,
                    birthday,
                    password,
                    cpf
                });
                console.log("resultado da requisição do service:", user);
                return res.status(200).json(user);
            }
            catch (err) {
                if (err instanceof badRequestExtend_1.BadRequestError) {
                    return res.status(err.statusCode).json({ code: err.statusCode, error: "Erro ao criar usuario", message: err.message });
                }
                return res.status(500).json({ code: 500, message: "Erro ao criar o usuário.", error: err });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
