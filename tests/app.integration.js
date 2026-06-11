import express from "express";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { createApiRouter } from "../src/routes/index.js"; // ajuste o caminho até sua pasta routes
import { AppError } from "../src/utils/AppError.js"; // ajuste o caminho até seu AppError.js

const app = express();

// Middleware global idêntico ao do seu server.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

// Acopla apenas o Roteador de API sob o prefixo /api (Foco dos RF-04 e RF-05)
app.use("/api", createApiRouter());

// Middleware de erro idêntico ao do seu server.js (Mantém compatibilidade com instanceof AppError)
app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            erro: err.message
        });
    }

    // Se quiser silenciar logs de erros esperados durante testes, pode comentar o console.error temporariamente
    // console.error(err);

    return res.status(500).json({
        erro: "Erro interno do servidor"
    });
});

export { app };