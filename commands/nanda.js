import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export default (bot, chatId) => {
    const photoPath = path.join(_dirname, "../public", "image", "nanda.jpg");
    bot.sendPhoto(chatId, photoPath, {
        caption: "Nanda teh orang bogor, nu resep ngoding, sareng ngadamel aplikasi web. Ayeuna nuju diajar lewih jero ngeunaan pemrograman. Nu bade kenal langkung jero tiasa di tingali di (https://nandaportfolio.my.id). Hatur nuhun.\n\nKlik tombol ieu /start kanggo balik deui ka menu utama.",
        parse_mode: "Markdown",
    });
};
