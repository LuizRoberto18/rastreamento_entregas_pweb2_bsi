import express from "express";
import { prisma } from "../database/prismaClient.js";

// Repositórios
import { EntregasPrismaRepository } from "../repositories/prisma/EntregasPrismaRepository.js";
import { MotoristasPrismaRepository } from "../repositories/prisma/MotoristasPrismaRepository.js";
import { RelatoriosPrismaRepository } from "../repositories/prisma/RelatoriosPrismaRepository.js";
import { UsuariosPrismaRepository } from "../repositories/prisma/UsuariosPrismaRepository.js";

// Serviços
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasService } from "../services/MotoristasService.js";
import { AuthService } from "../services/AuthService.js";

// Controllers API
import { EntregasController } from "../controllers/EntregasController.js";
import { MotoristasController } from "../controllers/MotoristasController.js";
import { RelatoriosController } from "../controllers/RelatoriosController.js";
import { AuthController } from "../controllers/AuthController.js";

// Controllers Painel
import { PainelEntregasController } from "../controllers/painel/EntregasController.js";
import { PainelMotoristasController } from "../controllers/painel/MotoristasController.js";
import { PainelRelatoriosController } from "../controllers/painel/RelatoriosController.js";

// Rotas
import { createEntregasRouter } from "./EntregasRoutes.js";
import { createMotoristasRouter } from "./MotoristasRoutes.js";
import { createRelatoriosRouter } from "./RelatoriosRoutes.js";
import { createAuthRouter } from "./AuthRoutes.js";
import { createPainelRouter } from "./PainelRoutes.js";

// Middlewares
import { autenticar } from "../middlewares/autenticar.js";

export function createApiRouter() {
  const router = express.Router();

  // Instanciação
  const databasePrisma = prisma;
  const entregasRepo = new EntregasPrismaRepository(databasePrisma);
  const motoristasRepo = new MotoristasPrismaRepository(databasePrisma);
  const relatoriosRepo = new RelatoriosPrismaRepository(databasePrisma);
  const usuariosRepo = new UsuariosPrismaRepository(databasePrisma);

  const entregasService = new EntregasService(entregasRepo, motoristasRepo);
  const motoristasService = new MotoristasService(motoristasRepo);
  const authService = new AuthService(usuariosRepo);

  // Controllers destinados à API REST
  const entregasController = new EntregasController(entregasService);
  const motoristasController = new MotoristasController(motoristasService, entregasService);
  const relatoriosController = new RelatoriosController(relatoriosRepo);
  const authController = new AuthController(authService);

  // Controllers destinados à Interface do Painel
  const painelEntregasController = new PainelEntregasController(entregasService, motoristasService);
  const painelMotoristasController = new PainelMotoristasController(motoristasService);
  const painelRelatoriosController = new PainelRelatoriosController(relatoriosRepo);

  // Acoplamento de Rotas Totalmente Públicas
  router.use("/auth", createAuthRouter(authController));

  //
  // A partir daqui, nada passa sem Token válido
  //


  // Aplicação do Guarda Transversal 
  router.use(autenticar);

  // Montagem dos escopos internos
  router.use("/entregas", createEntregasRouter(entregasController));
  router.use("/motoristas", createMotoristasRouter(motoristasController));
  router.use("/relatorios", createRelatoriosRouter(relatoriosController));

  //Montagem do escopo do Painel 
  const painelControllersCombined = {
    entregasController: painelEntregasController,
    motoristasController: painelMotoristasController,
    relatoriosController: painelRelatoriosController
  };

  router.use("/painel", createPainelRouter(
    entregasService,
    motoristasService,
    relatoriosRepo,
    painelControllersCombined
  ));

  return router;
}