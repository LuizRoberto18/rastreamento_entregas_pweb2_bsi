import express from "express";
import { autorizar } from "../middlewares/autorizar.js";

export function createMotoristasRouter(motoristasController) {
  const router = express.Router();

  router.post("/", autorizar("GESTOR"), motoristasController.criarMotorista);
  router.get("/", motoristasController.listarMotoristas);
  router.get("/:id", motoristasController.obterMotoristaPorId);
  router.get("/:id/entregas", motoristasController.listarEntregasPorMotorista);
  
  if (motoristasController.atualizarMotorista) {
    router.patch("/:id", autorizar("GESTOR"), motoristasController.atualizarMotorista);
  } else {
    router.patch("/:id", autorizar("GESTOR"), (req, res) => res.status(501).send("Not Implemented"));
  }

  return router;
}
