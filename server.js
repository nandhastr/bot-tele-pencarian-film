import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import telegramRoutes from "./routes/TelegramRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Atur folder public untuk static file
const __dirname = fileURLToPath(import.meta.url);
app.use("/image", express.static(path.join(__dirname, "public/image")));


app.use("/api/telegram", telegramRoutes)

export default app;
