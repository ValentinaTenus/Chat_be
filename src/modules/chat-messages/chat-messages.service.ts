import { IMessage } from "~/models/message.model.js";

import { chatMessagesRepository, ChatMessagesRepository } from "./chat-messages.repository.js";

class ChatMessageService {
  private chatMessagesRepository: ChatMessagesRepository;

  public constructor(chatMessagesRepository: ChatMessagesRepository) {
      this.chatMessagesRepository = chatMessagesRepository;
  }

  async createMessage(messageData: Partial<IMessage>): Promise<IMessage> {
    return this.chatMessagesRepository.create(messageData);
  }

  async updateMessage(id: string, messageData: Partial<IMessage>): Promise<IMessage> {
    return this.chatMessagesRepository.update(id, messageData);
  }
}

const chatMessageService = new ChatMessageService(chatMessagesRepository);

export { ChatMessageService, chatMessageService };