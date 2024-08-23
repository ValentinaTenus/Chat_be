import { Router } from "express";

import { chatController } from "./chats.controller.js";

const router = Router();

router.get("/", chatController.getAllChats.bind(chatController));
router.get("/:id", chatController.getChatById.bind(chatController));
router.post("/", chatController.createChat.bind(chatController));
router.put("/:id", chatController.updateChat.bind(chatController));
router.delete("/:id", chatController.deleteChat.bind(chatController));

export default router;
