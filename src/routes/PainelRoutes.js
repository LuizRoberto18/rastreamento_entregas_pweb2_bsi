import express from "express";
import { autorizar } from "../middlewares/autorizar.js";
import { prisma } from "../database/prismaClient.js";
import { EntregasPrismaRepository } from "../repositories/prisma/EntregasPrismaRepository.js";
import { MotoristasPrismaRepository } from "../repositories/prisma/MotoristasPrismaRepository.js";
import { RelatoriosPrismaRepository } from "../repositories/prisma/RelatoriosPrismaRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasService } from "../services/MotoristasService.js";
import { PainelEntregasController } from "../controllers/painel/EntregasController.js";
import { PainelMotoristasController } from "../controllers/painel/MotoristasController.js";
import { PainelRelatoriosController } from "../controllers/painel/RelatoriosController.js";

export function createPainelRouter(...args) {
  const router = express.Router();

  let entregasController, motoristasController, relatoriosController;

  // CENÁRIO A: Chamado pelo index.js antigo (4 argumentos, onde o último contém os controllers)
  if (args.length === 4 && args[3] && args[3].entregasController) {
    const controllers = args[3];
    entregasController = controllers.entregasController;
    motoristasController = controllers.motoristasController;
    relatoriosController = controllers.relatoriosController;
  }
  // CENÁRIO B: Chamado com 1 argumento (Objeto direto contendo os controllers)
  else if (args.length === 1 && args[0] && args[0].entregasController) {
    const controllers = args[0];
    entregasController = controllers.entregasController;
    motoristasController = controllers.motoristasController;
    relatoriosController = controllers.relatoriosController;
  }
  // CENÁRIO C: Chamado pelo server.js (0 argumentos) ou assinatura inválida -> Ativa Auto-instanciação segura
  else {
    const databasePrisma = prisma;
    const entregasRepo = new EntregasPrismaRepository(databasePrisma);
    const motoristasRepo = new MotoristasPrismaRepository(databasePrisma);
    const relatoriosRepo = new RelatoriosPrismaRepository(databasePrisma);

    const entregasService = new EntregasService(entregasRepo, motoristasRepo);
    const motoristasService = new MotoristasService(motoristasRepo);

    entregasController = new PainelEntregasController(entregasService, motoristasService);
    motoristasController = new PainelMotoristasController(motoristasService);
    relatoriosController = new PainelRelatoriosController(relatoriosRepo);
  }

  // --- SUB-ROTAS DE ENTREGAS NO PAINEL ---
  router.get("/entregas", entregasController.listarEntregas);
  router.get("/entregas/nova", entregasController.exibirNovaEntrega);
  
  // RF-04: Garante que o criadorId seja injetado no payload vindo do formulário web
  router.post("/entregas", (req, res, next) => {
    if (req.usuario) req.body.criadorId = req.usuario.id;
    return entregasController.criarEntrega(req, res, next);
  });
  
  router.get("/entregas/:id", entregasController.detalharEntrega);
  router.patch("/entregas/:id/atribuir", entregasController.atribuirMotorista);
  router.post("/entregas/:id/atribuir", entregasController.atribuirMotorista);
  router.patch("/entregas/:id/avancar", entregasController.avancarEntrega);
  router.post("/entregas/:id/avancar", entregasController.avancarEntrega);
  
  // RF-03: Bloqueio rígido de cancelamento no painel para perfis não autorizados (Apenas GESTOR)
  router.patch("/entregas/:id/cancelar", autorizar("GESTOR"), entregasController.cancelarEntrega);
  router.post("/entregas/:id/cancelar", autorizar("GESTOR"), entregasController.cancelarEntrega);

  // --- SUB-ROTAS DE MOTORISTAS NO PAINEL ---
  router.get("/motoristas", motoristasController.listarMotoristas);
  router.get("/motoristas/novo", autorizar("GESTOR"), motoristasController.exibirNovoMotorista);
  router.post("/motoristas", autorizar("GESTOR"), motoristasController.criarMotorista);
  router.post("/motoristas/:id/ativar", autorizar("GESTOR"), motoristasController.ativarMotorista);
  router.post("/motoristas/:id/inativar", autorizar("GESTOR"), motoristasController.inativarMotorista);

  // --- SUB-ROTAS DE RELATÓRIOS NO PAINEL ---
  router.get("/relatorios", autorizar("GESTOR"), relatoriosController.exibirRelatorios);

  return router;
}