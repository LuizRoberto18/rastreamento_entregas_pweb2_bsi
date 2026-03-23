import express from "express";
import EntregasRoutes from "./routes/EntregasRoutes.js";
import { AppError } from "./utils/AppError.js";

const app = express();
const PORT = 3000;

// Middleware global
app.use(express.json());

// Rotas principais
app.use("/api/entregas", EntregasRoutes);

// Rota de health check (boa prática)
app.get("/", (req, res) => {
    res.send("API de Rastreamento de Entregas está rodando 🚀");
});

// Middleware de erro (opcional, mas recomendado)
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