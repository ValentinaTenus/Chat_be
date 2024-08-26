import { Router } from "express";

import { UserController } from "./user.controller.js";
import { authenticateJWT } from "../../middleware/auth-middleware.js";

const router = Router();
const userController = new UserController();

router.get("/current", authenticateJWT, userController.getUserProfile);

export default router;
