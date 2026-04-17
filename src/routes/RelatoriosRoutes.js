import express from "express";

export function createRelatoriosRouter(relatoriosController) {
  const router = express.Router();

  // RF-05: rotas exigidas pela Atividade 07.
  // Caminhos finais (com prefixo /api/relatorios definido em routes/index.js):
  // - GET /api/relatorios/entregas-por-status
  // - GET /api/relatorios/motoristas-ativos
  router.get("/entregas-por-status", relatoriosController.getEntregasPorStatus);
  router.get("/motoristas-ativos", relatoriosController.getMotoristasAtivos);

  return router;
}
