import express from "express";
import { autorizar } from "../middlewares/autorizar.js";

export function createRelatoriosRouter(relatoriosController) {
  const router = express.Router();
  
  router.use(autorizar("GESTOR"));

  router.get("/entregas-por-status", relatoriosController.getEntregasPorStatus);
  router.get("/motoristas-ativos", relatoriosController.getMotoristasAtivos);

  return router;
}
