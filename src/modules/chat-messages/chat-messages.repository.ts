import { Message, IMessage } from "~/models/message.model.js";

class ChatMessagesRepository {
  async findAll(): Promise<IMessage[]> {
   return  Message.find().exec();
  }

  async create(messageData: Partial<IMessage>): Promise<IMessage> {
    try {
      const createdMessage = await Message.create(messageData);

      return createdMessage;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }

  async update(id: string, messageData: Partial<IMessage>): Promise<IMessage | null> {
    return Message.findByIdAndUpdate(id, messageData, { new: true });
  }
}

const chatMessagesRepository = new ChatMessagesRepository();

export { ChatMessagesRepository, chatMessagesRepository };

