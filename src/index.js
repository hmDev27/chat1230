import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import cors from "cors";

dotenv.config()


const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "*",
,
    credentials: true,
})
)

app.use("/api/auth/", authRoutes);
app.use("/api/messages", messageRoutes);



server.listen(process.env.PORT,'0.0.0.0', ()=> {
    console.log("Server is running on PORT:", PORT);
    connectDB();

});

