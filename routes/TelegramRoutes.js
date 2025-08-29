import express from "express";
import TelegramBot from "node-telegram-bot-api";
import { telegramController } from "../Controller/TelegramController.js";

const router = express.Router();

const token = process.env.API_TELEGRAM_BOT;

let bot;
if (process.env.NODE_ENV === "production") {
    bot = new TelegramBot(token); // production webhook
    const webhookUrl = `${process.env.BASE_URL}/api/telegram/webhook`;
    bot.setWebHook(webhookUrl);

    router.post("/webhook", (req, res) => {
        bot.processUpdate(req.body);
        res.sendStatus(200);
    });
    console.log("Bot berjalan dalam mode (production)");
} else {
    bot = new TelegramBot(token, { polling: true }); // lokal polling
    console.log("Bot berjalan dalam mode (local dev)");
}

//controlle
telegramController(bot);


router.get("/", (req, res) => {
    res.send("Telegram Bot berhasil dijalankan.");
});
export default router;
