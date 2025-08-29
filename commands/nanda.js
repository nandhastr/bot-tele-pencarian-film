
// export default (bot, chatId) => {
//     const photoPath = "https://botpencarianfilm.vercel.app/image/nanda.jpg";
//     bot.sendPhoto(chatId, photoPath, {
//         caption: "Nanda teh orang bogor, nu resep ngoding, sareng ngadamel aplikasi web. Ayeuna nuju diajar lewih jero ngeunaan pemrograman. Nu bade kenal langkung jero tiasa di tingali di (https://nandaportfolio.my.id). Hatur nuhun.\n\nKlik tombol ieu /start kanggo balik deui ka menu utama.",
//         parse_mode: "Markdown",
//     });
// };
export default async (bot, chatId) => {
    const photoUrl = "https://botpencarianfilm.vercel.app/image/nanda.jpg";
    const response = await fetch(photoUrl);
    const buffer = await response.buffer();

    try {
        await bot.sendPhoto(chatId, buffer, {
            caption: "Nanda teh orang bogor, nu resep ngoding, sareng ngadamel aplikasi web. Ayeuna nuju diajar lewih jero ngeunaan pemrograman. Nu bade kenal langkung jero tiasa di tingali di (https://nandaportfolio.my.id). Hatur nuhun.\n\nKlik tombol ieu /start kanggo balik deui ka menu utama.",
            parse_mode: "Markdown",
        });
    } catch (err) {
        console.error("Gagal kirim foto:", err.message);
    }
};
