require('dotenv').config(); /* (подключаем документ .env с токеном) */
const TelegramApi = require("node-telegram-bot-api"); /* (модуль для работы с телеграмом) */

const bot = new TelegramApi(process.env.TOKEN, {polling: true}); /* (создаем бота, передаем токен доступа и опцию polling(? регулярно отправляет запрос)) */

const chats = {}; /* (для результатов игры) */

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "1", callback_data: "1"}, {text: "2", callback_data: "2"}, {text: "3", callback_data: "3"}],
            [{text: "4", callback_data: "4"}, {text: "5", callback_data: "5"}, {text: "6", callback_data: "6"}],
            [{text: "7", callback_data: "7"}, {text: "8", callback_data: "8"}, {text: "9", callback_data: "9"}],
            [{text: "0", callback_data: "0"}]
        ]
    })
} /* (обьект для вывода клавиатуры, поле text будет показано на экране, поле callback_data вернется в сообщении при нажатии на эту кнопку, используем слушатель события callback_query) */

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "Играть еще раз", callback_data: "/again"}]
        ]
    })
} /* (обьект для вывода кнопки "Играть еще раз", поле text будет показано на экране, поле callback_data вернется в сообщении при нажатии на эту кнопку, используем слушатель события callback_query) */

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Сейчас я загадаю число от 0 до 9, попробуй его угадать"); /* (сообщение для пользователя) */
    const randomNumber = Math.floor(Math.random() * 10); /* (генерируем случайное число) */
    chats[chatId] = randomNumber; /* (помещаем в обьект для результатов) */
    await bot.sendMessage(chatId, "Отгадывай!", gameOptions); /* (третьим параметром добавляем опции, в д.с это json-обьект reply_markup, который выведет данные - клавиатуру) */
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'mini-game "Угадай число"'}
    ]) /* (выносим доступные команды в меню - закидываем обьекты с командами и описанием в массив, и в телеграме они будут доступны на кнопке Memu) */
    
    bot.on('message', async msg => { /* (функционал для события сообщение) */
        // console.log(msg); /* (сообщение представляет собой обьект с инфо от кого, инфо о сессии и самим сообщением) */
        const text = msg.text; /* (текст сообщения) */
        const chatId = msg.chat.id; /* (id сессии(самого чата)) */
    
        // bot.sendMessage(chatId, `Ты мне написал ${text}`); /* (пример - на входящее сообщение отправит его же обратно  с добавлением текста) */
    
        /* (варианты ответов на запросы(на текст из сообщений)) */
        if (text === '/start') {
            await bot.sendSticker(chatId, `https://data.chpic.su/stickers/p/PickleAga/PickleAga_037.webm`); /* (встраиваем картинку приветствия) */
            return bot.sendMessage(chatId, "Добро пожаловать в тест-чат от Sinzem");
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') { /* (мини-игра) */
           return startGame(chatId); /* (запуск функции с игрой) */
        }
        return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй еще раз"); /* (дефолтный ответ) */
    })

    bot.on("callback_query", async msg => { /* (навешиваем слушатель на событие нажатия на кнопки, сгенерированные из обьекта reply_markup(в д.с это клавиатура или повторный запуск игры)) */
        console.log(msg); 
        const data = msg.data; /* (получаем значение нажатой кнопки) */
        const chatId = msg.message.chat.id; /* (id сессии) */
        if (data === "/again") { /* (перезапуск игры, если нажали кнопку "Играть еще раз") */
            return startGame(chatId);
        }
        /* (cравниваем пришедшее(нажатое) число со случайно сгенерированным числом из обьекта chats и выдаем соответственное сообщение) */
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты угадал - это число ${chats[chatId]}`, againOptions);
        } else {
            return bot.sendMessage(chatId, `К сожалению, ответ не верный - это было число ${chats[chatId]}`, againOptions);
        }
    })
}

start();