module.exports = { /* (подключаем в index.js) */
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "1", callback_data: "1"}, {text: "2", callback_data: "2"}, {text: "3", callback_data: "3"}],
                [{text: "4", callback_data: "4"}, {text: "5", callback_data: "5"}, {text: "6", callback_data: "6"}],
                [{text: "7", callback_data: "7"}, {text: "8", callback_data: "8"}, {text: "9", callback_data: "9"}],
                [{text: "0", callback_data: "0"}]
            ]
        })
    }, /* (обьект для вывода клавиатуры, поле text будет показано на экране, поле callback_data вернется в сообщении при нажатии на эту кнопку, используем слушатель события callback_query) */
    
    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Играть еще раз", callback_data: "/again"}]
            ]
        })
    } /* (обьект для вывода кнопки "Играть еще раз", поле text будет показано на экране, поле callback_data вернется в сообщении при нажатии на эту кнопку, используем слушатель события callback_query) */
}