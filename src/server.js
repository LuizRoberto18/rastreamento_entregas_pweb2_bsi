import "dotenv/config"; 

import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import methodOverride from "method-override";
import { createApiRouter } from "./routes/index.js";
import { createPainelRouter } from "./routes/PainelRoutes.js";
import { autenticar } from "./middlewares/autenticar.js";
import { AppError } from "./utils/AppError.js";


const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

// Rotas principais
app.use("/api", createApiRouter());
app.use("/painel",autenticar, createPainelRouter());

// Rota de login (Frontend)
app.get("/login", (req, res) => {
    res.render("auth/login", { pageTitle: "Login" });
});

// Rota de cadastro (Frontend)
app.get("/registrar", (req, res) => {
    res.render("auth/registrar", { pageTitle: "Cadastro" });
});

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