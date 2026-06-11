import { Router } from "express";

export function createAuthRouter(authController) {
  const router = Router();

  // Rotas totalmente públicas de entrada do ecossistema
  router.post("/registrar", authController.registrar.bind(authController));
  router.post("/login", authController.login.bind(authController));

  return router;
}