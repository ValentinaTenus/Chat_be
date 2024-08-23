import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IMessage } from "./message.model";

interface IChat extends Document {
  firstName: string;
  lastName: string;
  messages: IMessage[];
}

const chatSchema = new Schema<IChat>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message"}]
});

const Chat = mongoose.model<IChat>("Chat", chatSchema);

export { Chat, IChat };
