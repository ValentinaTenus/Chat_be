import mongoose from "mongoose";
import { config } from "dotenv";

import { senderRole } from "~/common/enums/user-role.enum.js";
import { Chat } from "../models/chat.model.js"; 
import { Message } from "~/models/message.model.js";

config();

const messages = [
  { senderRole: senderRole.USER, text: "Hello there!",  timestamp: new Date(10,2)},
  { senderRole: senderRole.SYSTEM, text: "Hi Alice!",  timestamp: new Date(11,2) },
  { senderRole: senderRole.USER, text: "Good morning!",  timestamp: new Date(9,2) },
  { senderRole: senderRole.SYSTEM, text: "Good morning, Bob!",  timestamp: new Date(10,2) },
  { senderRole: senderRole.USER, text: "How are you?", timestamp: new Date(10,2) },
  { senderRole: senderRole.SYSTEM, text: "I’m good, thanks!",  timestamp: new Date(11,2) },

]
// const messages = [
//   { _id: "e0c2f170-6ae1-4f87-a8a4-cc5ae58b5c1e", senderRole: senderRole.USER, text: "Hello there!", chatId: "e7d3f941-8f7c-4b4a-9e7b-3b8e60e1a5c2", timestamp: new Date(10,2)},
//   { _id: "e0c2f171-6ae1-4f87-a8a4-cc5ae58b5c1e", senderRole: senderRole.SYSTEM, text: "Hi Alice!", chatId: "e7d3f941-8f7c-4b4a-9e7b-3b8e60e1a5c2", timestamp: new Date(11,2) },
//   { _id: "9dff7452-4c77-4e6d-94fc-35f7e9c1d3d3", senderRole: senderRole.USER, text: "Good morning!", chatId: "2d4a7e6d-4176-4a75-96c9-b7b5ad9a4f5b", timestamp: new Date(9,2) },
//   { _id: "9dff7453-4c77-4e6d-94fc-35f7e9c1d3d3", senderRole: senderRole.SYSTEM, text: "Good morning, Bob!", chatId: "2d4a7e6d-4176-4a75-96c9-b7b5ad9a4f5b", timestamp: new Date(10,2) },
//   { _id: "9dff7454-4c77-4e6d-94fc-35f7e9c1d3d3", senderRole: senderRole.USER, text: "How are you?", chatId: "a7623f4a-6cb1-4e68-9df5-89baebd4d22e", timestamp: new Date(10,2) },
//   { _id: "9dff7455-4c77-4e6d-94fc-35f7e9c1d3d3", senderRole: senderRole.SYSTEM, text: "I’m good, thanks!", chatId: "a7623f4a-6cb1-4e68-9df5-89baebd4d22e", timestamp: new Date(11,2) },

// ]

const chats = [
  {
    firstName: "Alice",
    lastName: "Johnson",
  },
  {
    firstName: "Bob",
    lastName: "Smith",
  },
  {
    firstName: "Charlie",
    lastName: "Brown",
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log("Connected to MongoDB");

    await Chat.deleteMany({});
    const insertedChats = await Chat.insertMany(chats);
    const chatIdMap = new Map(insertedChats.map(chat => [chat.firstName, chat._id]));

    const updatedMessages = messages.map(message => {
      let chatId;
      switch (message.text) {
        case "Hello there!":
        case "Hi Alice!":
          chatId = chatIdMap.get("Alice");
          break;
        case "Good morning!":
        case "Good morning, Bob!":
          chatId = chatIdMap.get("Bob");
          break;
        case "How are you?":
        case "I’m good, thanks!":
          chatId = chatIdMap.get("Charlie");
          break;
        default:
          chatId = null;
      }
      return { ...message, chatId };
    });

    await Message.deleteMany({});
    await Message.insertMany(updatedMessages);

  } catch (error) {
    console.error('Error seeding database:', error);
  } 
};

export { seedDatabase };
