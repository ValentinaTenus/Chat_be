import { Request, Response } from "express";

import { chatService } from "./chats.service.js";

class ChatController {
  async getAllChats(req: Request, res: Response): Promise<void> {
    try {
      const search  = req.query.search as string | undefined;
      const chats = await chatService.getAllChats(search);
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ message: "Error fetching chats", error });
    }
  }

  async getChatById(req: Request, res: Response): Promise<void> {
    try {
      const chat = await chatService.getChatById(req.params.id);
      if (chat) {
        res.status(200).json(chat);
      } else {
        res.status(404).json({ message: "Chat not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching chat", error });
    }
  }

  async createChat(req: Request, res: Response): Promise<void> {
    try {
      const newChat = await chatService.createChat(req.body);
      res.status(201).json(newChat);
    } catch (error) {
      res.status(500).json({ message: "Error creating chat", error });
    }
  }

  async updateChat(req: Request, res: Response): Promise<void> {
    try {
      const updatedChat = await chatService.updateChat(req.params.id, req.body);
      if (updatedChat) {
        res.status(200).json(updatedChat);
      } else {
        res.status(404).json({ message: "Chat not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating chat", error });
    }
  }

  async deleteChat(req: Request, res: Response): Promise<void> {
    try {
      const deletedChat = await chatService.deleteChat(req.params.id);
      if (deletedChat) {
        res.status(200).json(deletedChat);
      } else {
        res.status(404).json({ message: "Chat not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting chat", error });
    }
  }
}

export const chatController = new ChatController();
