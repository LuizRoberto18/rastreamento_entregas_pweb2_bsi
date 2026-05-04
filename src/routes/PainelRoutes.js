import express from "express";
import { prisma } from "../database/prismaClient.js";
import { EntregasPrismaRepository } from "../repositories/prisma/EntregasPrismaRepository.js";
import { MotoristasPrismaRepository } from "../repositories/prisma/MotoristasPrismaRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasService } from "../services/MotoristasService.js";
import { PainelEntregasController } from "../controllers/painel/EntregasController.js";
import { PainelMotoristasController } from "../controllers/painel/MotoristasController.js";

export function createPainelRouter() {
  const router = express.Router();

  const entregasRepo = new EntregasPrismaRepository(prisma);
  const motoristasRepo = new MotoristasPrismaRepository(prisma);

  const entregasService = new EntregasService(entregasRepo, motoristasRepo);
  const motoristasService = new MotoristasService(motoristasRepo);

  const entregasController = new PainelEntregasController(entregasService, motoristasService);
  const motoristasController = new PainelMotoristasController(motoristasService);

  router.get("/entregas", entregasController.listarEntregas);
  router.get("/entregas/nova", entregasController.exibirNovaEntrega);
  router.post("/entregas", entregasController.criarEntrega);
  router.get("/entregas/:id", entregasController.detalharEntrega);
  router.patch("/entregas/:id/atribuir", entregasController.atribuirMotorista);
  router.patch("/entregas/:id/avancar", entregasController.avancarEntrega);
  router.patch("/entregas/:id/cancelar", entregasController.cancelarEntrega);
  router.post("/entregas/:id/atribuir", entregasController.atribuirMotorista);
  router.post("/entregas/:id/avancar", entregasController.avancarEntrega);
  router.post("/entregas/:id/cancelar", entregasController.cancelarEntrega);

  router.get("/motoristas", motoristasController.listarMotoristas);
  router.get("/motoristas/novo", motoristasController.exibirNovoMotorista);
  router.post("/motoristas", motoristasController.criarMotorista);

  return router;
}
