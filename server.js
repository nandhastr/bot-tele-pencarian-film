import express from "express";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const token = process.env.API_TELEGRAM_BOT;
const tmdbAPI = process.env.TMDB_API_KEY;
const urlBaseApi = process.env.URL_BASE_API;
const urlBaseImage = process.env.URL_BASE_IMAGE;

if (!token) {
    throw new Error("API_TELEGRAM_BOT is not defined");
}
if (!tmdbAPI) {
    throw new Error("TMDB_API_KEY is not defined");
}
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text.toLocaleLowerCase();

    if (text === "/start") {
        bot.sendMessage(chatId, "Wilujeng sumping di *Bot Pencarian Film*! \nsok mangga tulisken nami film nu bade dipilarian. \n\n*Contoh:* \n\n/Rambo \n\nkenalan: \n\nketik /sahamaneh \n\nBantuan: \n\n ketik /tulung ", { parse_mode: "Markdown" });
        return;
    }

    if(text === "/tulung"){
        bot.sendMessage(chatId, "Mangga tulisken nami film nu bade dipilarian.", { parse_mode: "Markdown" });
        return;
    }

    if(text === "/aduh"){
        bot.sendMessage(chatId, "Punten euy, aya kesalahan hehe, coba deui sok mangga.", { parse_mode: "Markdown" });
        return;
    }

    if (text === "/sahamaneh") {
        bot.sendMessage(chatId, "Abdi teh bot pilarian film di Telegram, tiasa ngabantosan anjeun milarian inpormasi ngeunaan film.\n\n" + "Abdi diprogram ku A *Nanda* urang Ciawitali Bogor.\n\n" + "Info langkung lengkep tiasa pencet tombol ieu /nanda ", { parse_mode: "Markdown" });
        return;
    }
    

    if (text === "/film_populer") {
        
    }


    const _filename = fileURLToPath(import.meta.url);
    const _dirname = path.dirname(_filename);
    if (text === "/nanda") {

        const photoPath = path.join(_dirname, "public","image","nanda.jpg");
        bot.sendPhoto(
            chatId,
            photoPath, {
                caption: "Nanda teh orang bogor, nu resep ngoding, sareng ngadamel aplikasi web. Ayeuna nuju diajar lewih jero ngeunaan pemrograman. Nu bade kenal langkung jero tiasa di tingali di (https://nandaportfolio.my.id). hatur nuhun.\n\n klik tombol ieu /start kanggo balik deui ka menu utama.",
                contentType: "image/jpg",
                parse_mode: "Markdown",
        });
        return;
    }

    try {
        const url = `${urlBaseApi}/search/movie?api_key=${tmdbAPI}&query=${encodeURIComponent(text)}&language=id_ID`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            for (let movie of data.results.slice(0, 5)) {
                const posterURL = movie.poster_path ? `${urlBaseImage}${movie.poster_path}` : null;
                let caption = `${movie.title} (${movie.release_date ? movie.release_date.split("-")[0] : "N/A"})\n\n`;
                caption += movie.overview ? movie.overview : "Tidak ada deskripsi.";
                caption += `\n\n⭐ Rating: ${movie.vote_average}/${movie.vote_count} `;

                try {
                    const videoRes = await fetch(`${urlBaseApi}/movie/${movie.id}/videos?api_key=${tmdbAPI}&language=id-ID`);
                    const videoData = await videoRes.json();

                    const trailer = videoData.results.find((v) => v.type === "Trailler" && v.type === "Youtube");

                    if (trailer) {
                        caption = +`\n\n Tonton Trailler di (https://www.youtube.com/watch?v=${trailer.key})`;
                    } else {
                        caption += "\n\nTrailer tidak tersedia.";
                    }
                } catch (e) {
                    console.error("Error fetching trailer:", e);
                }

                if (posterURL) {
                    await bot.sendPhoto(chatId, posterURL, {
                        caption,
                        parse_mode: "Markdown",
                    });
                } else {
                    await bot.sendMessage(chatId, caption, {
                        parse_mode: "Markdown",
                    });
                }
            }
        } else {
            bot.sendMessage(chatId, `Punten euy, film nu bade dipilarian "${text}", teu kapanggih, coba deui sareng nami anu sanés.`);
        }
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        bot.sendMessage(chatId, "Punten, aya kesalahan, coba deui sok mangga.");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
