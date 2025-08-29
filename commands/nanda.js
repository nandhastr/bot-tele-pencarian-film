export default async(bot, chatId) => {
    bot.sendMessage(chatId, "Nanda teh orang bogor, nu resep ngoding, sareng ngadamel aplikasi web. Ayeuna nuju diajar lewih jero ngeunaan pemrograman. Nu bade kenal langkung jero tiasa di tingali di (https://nandaportfolio.my.id). Hatur nuhun.\n\nKlik tombol ieu /start kanggo balik deui ka menu utama.", { parse_mode: "Markdown" });
};

// export default async (bot, chatId) => {
//     const photoUrl = "https://botpencarianfilm.vercel.app/image/nanda.jpg";

//     try {
//         const response = await fetch(photoUrl);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//         const arrayBuffer = await response.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         await bot.sendPhoto(chatId, buffer, {
//             caption: "Nanda teh orang bogor, nu resep ngoding, sareng ngadamel aplikasi web. Ayeuna nuju diajar lewih jero ngeunaan pemrograman. Nu bade kenal langkung jero tiasa di tingali di (https://nandaportfolio.my.id). Hatur nuhun.\n\nKlik tombol ieu /start kanggo balik deui ka menu utama.",
//             parse_mode: "Markdown",
//         });
        
//         console.log("Foto berhasil dikirim ke chat:", chatId);
//     } catch (err) {
//         console.error("Gagal kirim foto:", err.message);
//     }
// };
