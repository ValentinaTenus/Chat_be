import { Router } from "express";

import { OAuthController } from "./oauth.controller.js";

const router = Router();
const oAuthController = new OAuthController();

router.post("/google", oAuthController.googleLogin);

export default router;
