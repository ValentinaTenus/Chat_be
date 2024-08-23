import mongoose, { Connection, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { senderRole } from "~/common/enums/user-role.enum.js";

import { IChat } from "./chat.model.js";

interface IMessage {
    senderRole: senderRole;
    text: string;
    chatId: Schema.Types.ObjectId;
    timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
    senderRole: {
        type: String,
        required: true,
        enum: Object.values(senderRole), 
    },
    text: { type: String, required: true },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",  
        required: true
    },
    timestamp: { type: Date, default: Date.now }
  });

const Message = mongoose.model<IMessage>("Message", messageSchema);

export { Message, IMessage };
