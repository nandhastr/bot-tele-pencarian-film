import express from "express";
import dotenv from "dotenv";

import telegramRoutes from "./routes/TelegramRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());


app.use("/api/telegram", telegramRoutes)

export default app;
