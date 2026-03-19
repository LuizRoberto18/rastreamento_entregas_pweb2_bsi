import express from "express";
// Rotas
import { EntregasRoutes } from "./routes/EntregasRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/entregas', EntregasRoutes);
app.use("/api",EntregasRoutes);


app.listen(PORT, () => {
    console.log(`Servidor ligado na porta ${PORT}`);
})