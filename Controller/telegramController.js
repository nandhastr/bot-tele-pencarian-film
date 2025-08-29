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

       try {
           switch (text) {
               case "/start":
                   await startCommand(bot, chatId);
                   break;
               case "/tulung":
                   await tulungCommand(bot, chatId);
                   break;
               case "/sahamaneh":
                   await sahamanehCommand(bot, chatId);
                   break;
               case "/nanda":
                   await nandaCommand(bot, chatId);
                   break;
               default:
                   await searchMovieCommand(bot, chatId, text);
           }
       } catch (err) {
           console.error(`Error saat memproses command: ${err}`);
           bot.sendMessage(chatId, "Ups, aya kasalahan. Coba deui engké.");
       }
   });


}