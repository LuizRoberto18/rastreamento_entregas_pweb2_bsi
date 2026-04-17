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
// PASSO A PASSO (Atividade 07) - ESTE e o principal ponto de composicao.
// Objetivo desta turma: migrar memoria -> SQL simples com MINIMA mudanca estrutural.
// Em outras palavras: manter a arquitetura e trocar apenas a implementacao do repository.
// RF-03 (repositories SQL) e RF-05 (rotas de relatorio) sao ligados aqui.
//
// ORDEM RECOMENDADA:
// 1) Criar conexao SQL (arquivo src/database/pgPool.js).
//    Observacao: o driver pg so abre conexao; as regras ficam em SQL puro nas queries.
// 2) Instanciar repositories SQL (EntregasPgRepository e MotoristasPgRepository).
// 3) Manter os services existentes SEM alterar codigo de regra de negocio.
// 4) Injetar os repositories SQL nos mesmos services/constructors atuais.
// 5) Criar RelatoriosPgRepository e RelatoriosController.
// 6) Registrar router /relatorios com createRelatoriosRouter(...).
// 7) Remover (ou comentar) Database/Repositories em memoria somente ao final.
//
// Dica para evitar erro comum:
// - Se voce sentir necessidade de alterar service/controller, pare e revise repository.
// - Nesta atividade, o ideal e alterar somente:
//   a) arquivo de conexao SQL,
//   b) repositories SQL,
//   c) este ponto de composicao.
//
// Exemplo de imports esperados (descomente ao implementar):
// import { createPgPool } from "../database/pgPool.js";
// import { EntregasPgRepository } from "../repositories/sql/EntregasPgRepository.js";
// import { MotoristasPgRepository } from "../repositories/sql/MotoristasPgRepository.js";
// import { RelatoriosPgRepository } from "../repositories/sql/RelatoriosPgRepository.js";
// import { RelatoriosController } from "../controllers/RelatoriosController.js";
// import { createRelatoriosRouter } from "./RelatoriosRoutes.js";

export function createApiRouter() {
  const router = express.Router();

  // ESTADO ATUAL (temporario): composicao em memoria.
  // TROCAR pelos objetos SQL no passo final da migracao.
  const database = new Database();
  const entregasRepo = new EntregasRepository(database);
  const motoristasRepo = new MotoristasRepository(database);

  const entregasService = new EntregasService(entregasRepo, motoristasRepo);
  const motoristasService = new MotoristasService(motoristasRepo);

  const entregasController = new EntregasController(entregasService);
  const motoristasController = new MotoristasController(motoristasService, entregasService);

  router.use("/entregas", createEntregasRouter(entregasController));
  router.use("/motoristas", createMotoristasRouter(motoristasController));

  // RF-05: depois de criar controller de relatorios, habilitar rota abaixo.
  // Resultado esperado:
  // GET /api/relatorios/entregas-por-status
  // GET /api/relatorios/motoristas-ativos
  // router.use("/relatorios", createRelatoriosRouter(relatoriosController));

  return router;
}
