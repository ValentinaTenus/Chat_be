import { Message, IMessage } from "~/models/message.model.js";

class ChatMessagesRepository {
  async findAllByChatId(): Promise<IMessage[]> {
   return  Message.find().exec();
  }

  async create(messageData: Partial<IMessage>): Promise<IMessage> {
    try {
      const createdMessage = await Message.create(messageData);
      console.log(createdMessage, 'createdMessage')

      return createdMessage;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }
}

const chatMessagesRepository = new ChatMessagesRepository();

export { ChatMessagesRepository, chatMessagesRepository };

