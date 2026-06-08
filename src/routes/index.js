import express from "express";
import { prisma } from "../database/prismaClient.js";
import { EntregasPrismaRepository } from "../repositories/prisma/EntregasPrismaRepository.js";
import { MotoristasPrismaRepository } from "../repositories/prisma/MotoristasPrismaRepository.js";
import { RelatoriosPrismaRepository } from "../repositories/prisma/RelatoriosPrismaRepository.js";
import { UsuariosPrismaRepository } from "../repositories/prisma/UsuariosPrismaRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasService } from "../services/MotoristasService.js";
import { AuthService } from "../services/AuthService.js";
import { EntregasController } from "../controllers/EntregasController.js";
import { MotoristasController } from "../controllers/MotoristasController.js";
import { RelatoriosController } from "../controllers/RelatoriosController.js";
import { AuthController } from "../controllers/AuthController.js";
import { createEntregasRouter } from "./EntregasRoutes.js";
import { createMotoristasRouter } from "./MotoristasRoutes.js";
import { createRelatoriosRouter } from "./RelatoriosRoutes.js";
import { createAuthRouter } from "./AuthRoutes.js";
import { autenticar } from "../middlewares/autenticar.js";

export function createApiRouter() {
  const router = express.Router();

  const entregasRepo = new EntregasPrismaRepository(prisma);
  const motoristasRepo = new MotoristasPrismaRepository(prisma);
  const relatoriosRepo = new RelatoriosPrismaRepository(prisma);
  const usuariosRepo = new UsuariosPrismaRepository(prisma);

  const entregasService = new EntregasService(entregasRepo, motoristasRepo);
  const motoristasService = new MotoristasService(motoristasRepo);
  const authService = new AuthService(usuariosRepo);

  const entregasController = new EntregasController(entregasService);
  const motoristasController = new MotoristasController(motoristasService, entregasService);
  const relatoriosController = new RelatoriosController(relatoriosRepo);
  const authController = new AuthController(authService);

  router.use("/auth", createAuthRouter(authController));
  
  router.use("/entregas", autenticar, createEntregasRouter(entregasController));
  router.use("/motoristas", autenticar, createMotoristasRouter(motoristasController));
  router.use("/relatorios", autenticar, createRelatoriosRouter(relatoriosController));

  return router;
}
