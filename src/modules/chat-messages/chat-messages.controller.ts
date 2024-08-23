import { Request, Response } from "express";

import { ChatMessageService, chatMessageService } from "./chat-messages.service.js";

class ChatMessagesController {
  private chatMessageService: ChatMessageService;

  public constructor(chatMessageService: ChatMessageService) {
      this.chatMessageService = chatMessageService;
  }

  async createChatMessage(req: Request, res: Response): Promise<void> {
    console.log('create mess', req.body)
    try {
      const newMessage = await this.chatMessageService.createMessage(req.body);
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: "Error creating message", error });
    }
  }
}

export const chatMessageController = new ChatMessagesController(chatMessageService);
