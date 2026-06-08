import { Router } from "express";

export function createAuthRouter(authController) {
  const router = Router();

  router.post("/registrar", authController.registrar.bind(authController));
  router.post("/login", authController.login.bind(authController));

  return router;
}
