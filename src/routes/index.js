import express from "express";
import { prisma } from "../database/prismaClient.js";
import { EntregasPrismaRepository } from "../repositories/prisma/EntregasPrismaRepository.js";
import { MotoristasPrismaRepository } from "../repositories/prisma/MotoristasPrismaRepository.js";
import { RelatoriosPrismaRepository } from "../repositories/prisma/RelatoriosPrismaRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasService } from "../services/MotoristasService.js";
import { EntregasController } from "../controllers/EntregasController.js";
import { MotoristasController } from "../controllers/MotoristasController.js";
import { RelatoriosController } from "../controllers/RelatoriosController.js";
import { createEntregasRouter } from "./EntregasRoutes.js";
import { createMotoristasRouter } from "./MotoristasRoutes.js";
import { createRelatoriosRouter } from "./RelatoriosRoutes.js";

export function createApiRouter() {
  const router = express.Router();

  const entregasRepo = new EntregasPrismaRepository(prisma);
  const motoristasRepo = new MotoristasPrismaRepository(prisma);
  const relatoriosRepo = new RelatoriosPrismaRepository(prisma);

  const entregasService = new EntregasService(entregasRepo, motoristasRepo);
  const motoristasService = new MotoristasService(motoristasRepo);

  const entregasController = new EntregasController(entregasService);
  const motoristasController = new MotoristasController(motoristasService, entregasService);
  const relatoriosController = new RelatoriosController(relatoriosRepo);

  router.use("/entregas", createEntregasRouter(entregasController));
  router.use("/motoristas", createMotoristasRouter(motoristasController));
  router.use("/relatorios", createRelatoriosRouter(relatoriosController));

  return router;
}
