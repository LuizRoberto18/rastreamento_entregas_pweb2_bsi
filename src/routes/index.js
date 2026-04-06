import express from "express";
import { Database } from "../database/database.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { MotoristasRepository } from "../repositories/MotoristasRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasService } from "../services/MotoristasService.js";
import { EntregasController } from "../controllers/EntregasController.js";
import { MotoristasController } from "../controllers/MotoristasController.js";
import { createEntregasRouter } from "./EntregasRoutes.js";
import { createMotoristasRouter } from "./MotoristasRoutes.js";

export function createApiRouter() {
  const router = express.Router();

  // Ponto unico de composicao de dependencias.
  const database = new Database();
  const entregasRepo = new EntregasRepository(database);
  const motoristasRepo = new MotoristasRepository(database);

  const entregasService = new EntregasService(entregasRepo, motoristasRepo);
  const motoristasService = new MotoristasService(motoristasRepo);

  const entregasController = new EntregasController(entregasService);
  const motoristasController = new MotoristasController(motoristasService, entregasService);

  router.use("/entregas", createEntregasRouter(entregasController));
  router.use("/motoristas", createMotoristasRouter(motoristasController));

  return router;
}
