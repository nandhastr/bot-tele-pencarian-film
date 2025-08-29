export default async(bot, chatId) => {
    bot.sendMessage(chatId, "Abdi teh bot pilarian film di Telegram, tiasa ngabantosan anjeun milarian inpormasi ngeunaan film.\n\n" + "Abdi diprogram ku A *Nanda* urang Ciawitali Bogor.\n\n" + "Info langkung lengkep tiasa pencet tombol ieu /nanda ", { parse_mode: "Markdown" });
};
