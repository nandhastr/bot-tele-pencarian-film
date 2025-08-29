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
                return await startCommand(bot, chatId);
            case "/tulung":
                return await tulungCommand(bot, chatId);
            case "/sahamaneh":
                return await sahamanehCommand(bot, chatId);
            case "/nanda":
                return await nandaCommand(bot, chatId);
            default:
                return await searchMovieCommand(bot, chatId, text);
        }

     })
}