import axios from "axios";
import { Schema } from "mongoose";
import { Server } from "socket.io";

import { senderRole } from "~/common/enums/index.js";
import { chatMessagesRepository } from "~/modules/chat-messages/chat-messages.repository.js";
import { chatRepository } from "~/modules/chats/chats.repository.js";

const QUOTES_API = process.env.QUOTES_API;

function setupSocket(io: Server) {
    io.on("connection", (socket) => {

        socket.on("send_quote_to_random_chat", async () => {
            try {
              const response = await axios.get(`${QUOTES_API}/?language_code=en`, {
                headers: {
                  "x-rapidapi-host": "quotes15.p.rapidapi.com",
                  "x-rapidapi-key": "2c214c09d8msh0c13cfb9f600e0dp186ebejsna1634052701b"
                }
              }); 
                const quote = response.data.content;

                const chats = await chatRepository.findAll();

                if (chats.length > 0) {
                    const randomChat = chats[Math.floor(Math.random() * chats.length)];

                    const newMessage = {
                      senderRole: senderRole.SYSTEM,
                      text: quote,
                      chatId: randomChat._id as Schema.Types.ObjectId,
                    };
                    
                    await chatMessagesRepository.create(newMessage);

                    io.emit("receive_message", { chatId: randomChat._id, message: newMessage });
                }
            } catch (error) {
                console.error("Error sending quote to random chat:", error);
                socket.emit("error", "An error occurred while sending the quote");
            }
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export { setupSocket };
