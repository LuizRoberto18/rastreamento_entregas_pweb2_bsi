import express from "express";

export function createMotoristasRouter(motoristasController) {
  const router = express.Router();

  router.post("/", motoristasController.criarMotorista);
  router.get("/", motoristasController.listarMotoristas);
  router.get("/:id", motoristasController.obterMotoristaPorId);
  router.get("/:id/entregas", motoristasController.listarEntregasPorMotorista);

  return router;
}
