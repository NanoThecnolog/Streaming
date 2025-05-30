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
exports.RecoverController = void 0;
const RecoverService_1 = require("../../Services/User/RecoverService");
class RecoverController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recoverService = new RecoverService_1.RecoverService();
                const { token, password } = req.body;
                const recover = yield recoverService.execute(token, password);
                return res.json(recover);
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
exports.RecoverController = RecoverController;
