import express from "express";

export function createRelatoriosRouter(relatoriosController) {
  const router = express.Router();

  router.get("/entregas-por-status", relatoriosController.getEntregasPorStatus);
  router.get("/motoristas-ativos", relatoriosController.getMotoristasAtivos);

  return router;
}
