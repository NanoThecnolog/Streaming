"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./router");
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use(express_1.default.json({ limit: '40mb' }));
app.use(express_1.default.urlencoded({ limit: '40mb', extended: true }));
app.set('trust proxy', true);
app.use((0, cors_1.default)());
app.use(router_1.router);
// Tratamento de erros
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ status: "error", message: 'Erro interno do servidor..' });
});
app.get("*", (req, res) => {
    res.status(200).send("O servidor está rodando!");
});
app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${port}`);
});
