require('dotenv').config(); /* (подключаем документ .env с токеном) */
const TelegramApi = require("node-telegram-bot-api"); /* (модуль для работы с телеграмом) */

const bot = new TelegramApi(process.env.TOKEN, {polling: true}); /* (создаем бота, передаем токен доступа и опцию polling(? регулярно отправляет запрос)) */

bot.on('message', msg => {
    console.log(msg);
})