import express from "express";
import { createPgPool } from "../database/pgPool.js";
import { createSqliteDatabase } from "../database/sqliteDb.js";
import { EntregasPgRepository } from "../repositories/sql/EntregasPgRepository.js";
import { MotoristasPgRepository } from "../repositories/sql/MotoristasPgRepository.js";
import { RelatoriosPgRepository } from "../repositories/sql/RelatoriosPgRepository.js";
import { EntregasSqliteRepository } from "../repositories/sql/EntregasSqliteRepository.js";
import { MotoristasSqliteRepository } from "../repositories/sql/MotoristasSqliteRepository.js";
import { RelatoriosSqliteRepository } from "../repositories/sql/RelatoriosSqliteRepository.js";
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
    const db = createSqliteDatabase();
    entregasRepo = new EntregasSqliteRepository(db);
    motoristasRepo = new MotoristasSqliteRepository(db);
    relatoriosRepo = new RelatoriosSqliteRepository(db);
    console.warn("DATABASE_URL nao definida. API iniciada com SQLite local.");
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
