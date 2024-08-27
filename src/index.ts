import cors from "cors";
import { config } from "dotenv";
import http from "http";
import express from "express";
import { Server } from "socket.io";

import { seedDatabase } from "./db/seeds.js";
import { authRoutes, chatRoutes, chatMessagesRoutes,oAuthRoutes, userRoutes} from "./routes/index.js";
import { setupSocket } from "./socket/socket.js";

const app = express();

config();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/chats", chatRoutes);
app.use("/chat-messages", chatMessagesRoutes);
app.use("/oauth", oAuthRoutes);
app.use("/users", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

setupSocket(io);

await seedDatabase();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
