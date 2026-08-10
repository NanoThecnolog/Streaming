import dotenv from 'dotenv'
dotenv.config()
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import { router } from './router';
import { corsOptions } from './Utils/CorsOptions'
import { SecurityHeaders } from './middlewares/SecurityHeaders'
import { SecurityCleanupService } from './Services/User/SecurityCleanupService'


const app = express();
const port = process.env.PORT || 3333;
const SECURITY_CLEANUP_INTERVAL_MS = 6 * 60 * 60 * 1000


app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));
app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(SecurityHeaders)
app.use(cors(corsOptions));
app.use(router);

// Tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
})

void SecurityCleanupService.execute().catch((error) => {
    console.error('Erro ao limpar registros de segurança expirados.', error)
})

const securityCleanupTimer = setInterval(() => {
    void SecurityCleanupService.execute().catch((error) => {
        console.error('Erro ao limpar registros de segurança expirados.', error)
    })
}, SECURITY_CLEANUP_INTERVAL_MS)
securityCleanupTimer.unref()
