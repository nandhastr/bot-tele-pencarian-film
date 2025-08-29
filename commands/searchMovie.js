import dotenv from "dotenv";
dotenv.config();

const tmdbAPI = process.env.TMDB_API_KEY;
const urlBaseApi = process.env.URL_BASE_API;
const urlBaseImage = process.env.URL_BASE_IMAGE;

export default async (bot, chatId, text) => {
    try {
        const url = `${urlBaseApi}/search/movie?api_key=${tmdbAPI}&query=${encodeURIComponent(text)}&language=id-ID`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return bot.sendMessage(chatId, `Punten euy, film "${text}" teu kapanggih, coba deui sareng nami anu sanés.`);
        }

        // Ambil maksimal 5 film
        const movies = data.results.slice(0, 5);

        // Kirim semua film secara parallel
        await Promise.all(
            movies.map(async (movie) => {
                const posterURL = movie.poster_path ? `${urlBaseImage}${movie.poster_path}` : null;

                // Buat caption
                let caption = `*${movie.title}* (${movie.release_date ? movie.release_date.split("-")[0] : "N/A"})\n\n`;
                caption += movie.overview ? movie.overview : "Tidak ada deskripsi.";
                caption += `\n\n⭐ Rating: ${movie.vote_average}/${movie.vote_count}`;

                // Fetch trailer (opsional)
                try {
                    const videoRes = await fetch(`${urlBaseApi}/movie/${movie.id}/videos?api_key=${tmdbAPI}&language=id-ID`);
                    const videoData = await videoRes.json();

                    const trailer = videoData.results.find((v) => v.site === "YouTube" && v.type === "Trailer");
                    if (trailer) {
                        caption += `\n\n🎬 [Tonton Trailer](https://www.youtube.com/watch?v=${trailer.key})`;
                    } else {
                        caption += "\n\nTrailer tidak tersedia.";
                    }
                } catch (e) {
                    console.error("Error fetching trailer:", e);
                    caption += "\n\nTrailer tidak tersedia.";
                }

                // Kirim poster atau text
                if (posterURL) {
                    try {
                        await bot.sendPhoto(chatId, posterURL, { caption, parse_mode: "MarkdownV2" });
                    } catch (e) {
                        console.error("Gagal kirim foto, kirim teks saja:", e.message);
                        await bot.sendMessage(chatId, caption, { parse_mode: "MarkdownV2" });
                    }
                } else {
                    await bot.sendMessage(chatId, caption, { parse_mode: "MarkdownV2" });
                }
            })
        );
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        bot.sendMessage(chatId, "Punten, aya kasalahan. Coba deui engke.");
    }
};
