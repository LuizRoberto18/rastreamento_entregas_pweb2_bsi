import express from "express";
import { autorizar } from "../middlewares/autorizar.js";

export function createEntregasRouter(entregasController) {
	const router = express.Router();

	router.post("/", entregasController.criarEntrega);
	router.get("/", entregasController.listarEntregas);
	router.get("/:id", entregasController.obterEntregaPorId);
	router.patch("/:id/avancar", entregasController.avancarEntrega);
	router.patch("/:id/cancelar", autorizar("GESTOR"), entregasController.cancelarEntrega);
	router.get("/:id/historico", entregasController.obterHistoricoEntrega);
	router.patch("/:id/atribuir", entregasController.atribuirMotorista);

	return router;
}