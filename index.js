require('dotenv').config(); /* (подключаем документ .env с токеном) */
const TelegramApi = require("node-telegram-bot-api"); /* (модуль для работы с телеграмом) */

const bot = new TelegramApi(process.env.TOKEN, {polling: true}); /* (создаем бота, передаем токен доступа и опцию polling(? регулярно отправляет запрос)) */

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'}
]) /* (выносим доступные команды в меню - закидываем обьекты с командами и описанием в массив, и в телеграме они будут доступны на кнопке Memu) */

bot.on('message', async msg => { /* (функционал для события сообщение) */
    // console.log(msg); /* (сообщение представляет собой обьект с инфо от кого, инфо о сессии и самим сообщением) */
    const text = msg.text; /* (текст сообщения) */
    const chatId = msg.chat.id; /* (id сессии(самого чата)) */

    // bot.sendMessage(chatId, `Ты мне написал ${text}`); /* (пример - на входящее сообщение отправит его же обратно  с добавлением текста) */

    /* (варианты ответов на запросы(на текст из сообщений)) */
    if (text === '/start') {
        await bot.sendSticker(chatId, `https://data.chpic.su/stickers/p/PickleAga/PickleAga_037.webm`); /* (встраиваем картинку приветствия) */
        await bot.sendMessage(chatId, "Добро пожаловать в тест-чат от Sinzem");
    }
    if (text === '/info') {
        await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
    }
})