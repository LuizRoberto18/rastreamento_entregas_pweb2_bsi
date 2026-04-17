import express from "express";
import { createApiRouter } from "./routes/index.js";
import { AppError } from "./utils/AppError.js";

// GUIA RAPIDO (Atividade 07) para iniciantes:
// PASSO 1 - Aqui em server.js:
// 1) Instale e configure dotenv (ou outra abordagem) para carregar .env antes de criar as rotas.
// 2) Troque PORT fixo por: process.env.PORT || 3000.
// 3) Nao precisa acessar banco diretamente neste arquivo.
//    A conexao SQL e a troca de repository devem ser montadas em src/routes/index.js.
// 4) Mantenha este middleware de erro como ponto central de resposta HTTP.
//    Ele ja converte AppError em status/mensagem corretos para a API.
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(express.json());

// Rotas principais
app.use("/api", createApiRouter());

// Rota de health check 
app.get("/", (req, res) => {
    res.send("API de Rastreamento de Entregas está rodando 🚀");
});

// Middleware de erro 
app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            erro: err.message
        });
    }

    // erro inesperado
    console.error(err);

    return res.status(500).json({
        erro: "Erro interno do servidor"
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});