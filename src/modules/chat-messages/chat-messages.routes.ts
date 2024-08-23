import { Router } from "express";

import { chatMessageController } from "./chat-messages.controller.js";

const router = Router();

router.post("/", chatMessageController.createChatMessage.bind(chatMessageController));

export default router;
