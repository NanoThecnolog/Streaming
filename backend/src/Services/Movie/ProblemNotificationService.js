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
exports.ProblemNotificationService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const apiMessenger_1 = require("../../Utils/apiMessenger");
const DebugLog_1 = require("../../Utils/DebugLog");
class ProblemNotificationService {
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notificationExiste = yield prisma_1.default.problem.findUnique({
                    where: { tmdbId: data.tmdbId }
                });
                if (notificationExiste)
                    return { code: 200, message: "Notificação de problema já relatada." };
                const newNotificaiton = yield prisma_1.default.problem.create({
                    data: {
                        title: data.title,
                        description: data.description,
                        tmdbId: data.tmdbId,
                        season: data.season,
                        episode: data.episode,
                        userId: data.userId,
                        status: 'pendente'
                    }
                });
                try {
                    yield apiMessenger_1.apiEmail.post('/system/problem', data);
                }
                catch (err) {
                    (0, DebugLog_1.debugLog)('Erro ao enviar email', err);
                    return {
                        code: 500,
                        message: "Erro ao enviar notificação por email",
                        error: err
                    };
                }
                return {
                    code: 200,
                    message: "Notificação criada com sucesso",
                    data: newNotificaiton
                };
            }
            catch (err) {
                (0, DebugLog_1.debugLog)("Erro ao criar notificação", err);
                return {
                    code: 500,
                    message: "Erro interno ao processar a notificação.",
                    error: err
                };
            }
        });
    }
}
exports.ProblemNotificationService = ProblemNotificationService;
