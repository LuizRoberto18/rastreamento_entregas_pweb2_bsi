import express from "express";
import { EntregasController } from "../controllers/EntregasController.js";
import { EntregasService } from "../services/EntregasService.js";

const router = express.Router();

router.get("/", EntregasController.listarEntregas());

export default router;