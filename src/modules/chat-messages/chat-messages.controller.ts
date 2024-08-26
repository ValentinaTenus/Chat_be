import { Request, Response } from "express";

import { ChatMessageService, chatMessageService } from "./chat-messages.service.js";

class ChatMessagesController {
  private chatMessageService: ChatMessageService;

  public constructor(chatMessageService: ChatMessageService) {
      this.chatMessageService = chatMessageService;
  }

  async createChatMessage(req: Request, res: Response): Promise<void> {
    try {
      const newMessage = await this.chatMessageService.createMessage(req.body);
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: "Error creating message", error });
    }
  }

  async updateChatMessage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedMessage = await this.chatMessageService.updateMessage(id, req.body);
      
      if (updatedMessage) {
        res.status(200).json(updatedMessage);
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating message", error });
    }
  }
}

export const chatMessageController = new ChatMessagesController(chatMessageService);
