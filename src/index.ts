import cors from "cors";
import { config } from "dotenv";
import http from "http";
import express from "express";
import { Server } from "socket.io";

import { seedDatabase } from "./db/seeds.js";
import { authRoutes, chatRoutes, chatMessagesRoutes,oAuthRoutes, userRoutes} from "./routes/index.js";

const app = express();

config();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/chats", chatRoutes);
app.use("/chat-messages", chatMessagesRoutes);
app.use("/oauth", oAuthRoutes);
app.use("/user", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })
})

await seedDatabase();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
