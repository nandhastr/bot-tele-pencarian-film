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

        // Fetch trailer semua film sekaligus
        const trailers = await Promise.all(
            movies.map(async (movie) => {
                try {
                    const videoRes = await fetch(`${urlBaseApi}/movie/${movie.id}/videos?api_key=${tmdbAPI}&language=id-ID`);
                    const videoData = await videoRes.json();
                    return videoData.results.find((v) => v.site === "YouTube" && v.type === "Trailer") || null;
                } catch (e) {
                    console.error(`Error fetching trailer for ${movie.title}:`, e);
                    return null;
                }
            })
        );

        // Kirim hasil
        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            const trailer = trailers[i];
            const posterURL = movie.poster_path ? `${urlBaseImage}${movie.poster_path}` : null;

            let caption = `${movie.title} (${movie.release_date ? movie.release_date.split("-")[0] : "N/A"})\n\n`;
            caption += movie.overview || "Tidak ada deskripsi.";
            caption += `\n\n⭐ Rating: ${movie.vote_average}/${movie.vote_count}`;

            if (trailer) {
                caption += `\n\n🎬 Tonton Trailer: https://www.youtube.com/watch?v=${trailer.key}`;
            } else {
                caption += "\n\nTrailer tidak tersedia.";
            }

            if (posterURL) {
                await bot.sendPhoto(chatId, posterURL, { caption, parse_mode: "Markdown" });
            } else {
                await bot.sendMessage(chatId, caption, { parse_mode: "Markdown" });
            }
        }
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        bot.sendMessage(chatId, "Punten, aya kasalahan. Coba deui engke.");
    }
};
