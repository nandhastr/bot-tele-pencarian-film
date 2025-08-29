import startCommand from "../commands/start.js";
import tulungCommand from "../commands/tulung.js";
import sahamanehCommand from "../commands/sahamaneh.js";
import nandaCommand from "../commands/nanda.js";
import searchMovieCommand from "../commands/searchMovie.js";



export const telegramController = (bot) => {
    bot.on("message", async (msg) => {

        const chatId = msg.chat.id;
        const text = msg.text.toLocaleLowerCase();
        console.log("Pesan masuk:", msg);
        switch (text) {
            case "/start":
                 await startCommand(bot, chatId);
            case "/tulung":
                 await tulungCommand(bot, chatId);
            case "/sahamaneh":
                 await sahamanehCommand(bot, chatId);
            case "/nanda":
                 await nandaCommand(bot, chatId);
            default:
                 await searchMovieCommand(bot, chatId, text);
        }

     })
}