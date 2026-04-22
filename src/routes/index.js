import express from "express";
import { createPgPool } from "../database/pgPool.js";
import { Database } from "../database/database.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { MotoristasRepository } from "../repositories/MotoristasRepository.js";
import { RelatoriosRepository } from "../repositories/RelatoriosRepository.js";
import { EntregasPgRepository } from "../repositories/sql/EntregasPgRepository.js";
import { MotoristasPgRepository } from "../repositories/sql/MotoristasPgRepository.js";
import { RelatoriosPgRepository } from "../repositories/sql/RelatoriosPgRepository.js";
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

  const usarSql = Boolean(process.env.DATABASE_URL);

  let entregasRepo;
  let motoristasRepo;
  let relatoriosRepo;

  if (usarSql) {
    const pool = createPgPool();
    entregasRepo = new EntregasPgRepository(pool);
    motoristasRepo = new MotoristasPgRepository(pool);
    relatoriosRepo = new RelatoriosPgRepository(pool);
  } else {
    const database = new Database();
    entregasRepo = new EntregasRepository(database);
    motoristasRepo = new MotoristasRepository(database);
    relatoriosRepo = new RelatoriosRepository(database);
    console.warn("DATABASE_URL nao definida. API iniciada em modo memoria.");
  }

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
