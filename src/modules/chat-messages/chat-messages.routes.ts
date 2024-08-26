import { Router } from "express";

import { chatMessageController } from "./chat-messages.controller.js";

const router = Router();

router.post("/", chatMessageController.createChatMessage.bind(chatMessageController));
router.put("/:id", chatMessageController.updateChatMessage.bind(chatMessageController));

export default router;
