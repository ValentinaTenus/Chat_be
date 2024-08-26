import { Router } from "express";

import { AuthController } from "./auth.controller.js";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/tokens", authController.getTokens.bind(authController));

export default router;
