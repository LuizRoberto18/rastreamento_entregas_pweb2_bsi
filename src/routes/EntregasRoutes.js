import express from "express";
import {Database} from "../database/Database.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { EntregasController } from "../controllers/EntregasController.js";

const router = express.Router();

const database = new Database();
const entregasRepository = new EntregasRepository(database);
const entregasService = new EntregasService(entregasRepository);
const entregasController = new EntregasController(entregasService);

router.post("/", entregasController.criarEntrega);
router.get("/", entregasController.listarEntregas);
router.get("/:id", entregasController.obterEntregaPorId);
router.patch("/:id/avancar", entregasController.avancarEntrega);
router.patch("/:id/cancelar", entregasController.cancelarEntrega);
router.get("/:id/historico", entregasController.obterHistoricoEntrega);

export default router;