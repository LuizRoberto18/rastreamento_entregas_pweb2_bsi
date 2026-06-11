import express from "express";
import { autorizar } from "../middlewares/autorizar.js";

export function createEntregasRouter(entregasController) {
  const router = express.Router();

  // RF-04: Interceptador para garantir o registro do id do criador no corpo da requisição
  router.post("/", (req, res, next) => {
    req.body.criadorId = req.usuario.id;
    return entregasController.criarEntrega(req, res, next);
  });

  router.get("/", entregasController.listarEntregas);
  router.get("/:id", entregasController.obterEntregaPorId);
  router.patch("/:id/avancar", entregasController.avancarEntrega);
  
  // RF-03: Restrição explícita para alteração de estado crítico (Apenas GESTOR)
  router.patch("/:id/cancelar", autorizar("GESTOR"), entregasController.cancelarEntrega);
  
  router.get("/:id/historico", entregasController.obterHistoricoEntrega);
  router.patch("/:id/atribuir", entregasController.atribuirMotorista);

  return router;
}