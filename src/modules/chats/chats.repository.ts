import mongoose from "mongoose";

import { Chat, IChat } from "../../models/chat.model.js";

class ChatRepository {
  async findAll(): Promise<IChat[]> {
    return  Chat.find().exec();
   }

  async findAllWithMessages(search?: string): Promise<IChat[]> {
    let matchStage = {};

    if (search) {
        matchStage = {
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } }
            ]
        };
    }

    const chats = await Chat.aggregate([
        {
            $match: matchStage
        },
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "chatId",
                as: "messages"
            }
        }
    ]).exec();

    return chats;
  }

  async findById(id: string): Promise<IChat | null> {
    const ObjectId = mongoose.Types.ObjectId;

    const chat = await Chat.aggregate([
      { $match: { _id: new ObjectId(id) } }, 
      {
        $lookup: {
          from: "messages",          
          localField: "_id",         
          foreignField: "chatId",   
          as: "messages"            
        }
      }
    ]);
  
    return chat.length > 0 ? chat[0] : null; 
  }

  async create(chatData: Partial<IChat>): Promise<IChat> {
    return Chat.create(chatData);
  }

  async update(id: string, chatData: Partial<IChat>): Promise<IChat | null> {
    return Chat.findByIdAndUpdate(id, chatData, { new: true });
  }

  async delete(id: string): Promise<IChat | null> {
    return Chat.findByIdAndDelete(id);
  }
}

export const chatRepository = new ChatRepository();
