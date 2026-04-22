import express from "express";
import dotenv from "dotenv";
import { createApiRouter } from "./routes/index.js";
import { AppError } from "./utils/AppError.js";

dotenv.config();

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