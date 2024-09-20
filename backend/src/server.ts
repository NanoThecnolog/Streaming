import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import { router } from './router';

const app = express();
const port = 3333;


app.use(express.json());
app.use(cors());
app.use(router);

// Tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ status: "error", message: 'Erro interno do servidor..' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})