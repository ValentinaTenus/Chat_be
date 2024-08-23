import { IChat } from "~/models/chat.model.js";

import { chatRepository } from "./chats.repository.js";

class ChatService {
  async getAllChats(search?: string): Promise<IChat[]> {
    return await chatRepository.findAllWithMessages(search);
  }

  async getChatById(id: string): Promise<IChat | null> {
    return chatRepository.findById(id);
  }

  async createChat(chatData: Partial<IChat>): Promise<IChat> {
    return chatRepository.create(chatData);
  }

  async updateChat(id: string, chatData: Partial<IChat>): Promise<IChat | null> {
    return chatRepository.update(id, chatData);
  }

  async deleteChat(id: string): Promise<IChat | null> {
    return chatRepository.delete(id);
  }
}

export const chatService = new ChatService();
