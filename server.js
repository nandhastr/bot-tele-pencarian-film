import express from "express";
import dotenv from "dotenv";

import telegramRoutes from "./routes/TelegramRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Atur folder public untuk static file
const __dirname = path.resolve();
app.use("/image", express.static(path.join(__dirname, "public/image")));


app.use("/api/telegram", telegramRoutes)

export default app;
