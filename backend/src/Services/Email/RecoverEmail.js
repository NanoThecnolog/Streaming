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
exports.RecoverAccService = void 0;
const apiMessenger_1 = require("../../Utils/apiMessenger");
const DebugLog_1 = require("../../Utils/DebugLog");
class RecoverAccService {
    execute(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sendEmail = yield apiMessenger_1.apiEmail.post('/recover/user', {
                    token,
                    userName: user.name,
                    userEmail: user.email
                });
                return sendEmail.data.data.accepted.length > 0 ? true : false;
            }
            catch (err) {
                console.log(err);
                (0, DebugLog_1.debugLog)(`Erro ao Enviar email de recuperação. mensagem: ${err.message}`);
                return false;
            }
        });
    }
}
exports.RecoverAccService = RecoverAccService;
