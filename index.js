const Bot = require('node-telegram-bot-api');
const request = require('request');

// API with schedule of space launches
const url = 'https://launchlibrary.net/1.3/launch';
const trigger = 'I want to travel!';    // user's input
const token = '480961810:AAECtZ2AkZuyaV0jn6JvgPLMC6mDmkstjdw';

const bot = new Bot(token, {polling: true});

const prepareData = (body) => {
    const launches = JSON.parse(body).launches;
    return launches.filter((launch) => launch !== undefined)
        .map((launch) => `${launch.name} on ${launch.net}`)
        .join('\n\n');
};

bot.on('message', (msg) => {
    if (msg.text.toString() === trigger) {
        return request(url, (err, resp, body) => {
            bot.sendMessage(msg.chat.id, prepareData(body));
        });
    } else if (msg.text.toString() === 'Hi') {
        bot.sendMessage(msg.from.id, 'Welcome ' + msg.from.first_name);
    }

    bot.sendMessage(msg.chat.id, 'Hi, do you want to travel?', {
        reply_markup: {
            keyboard: [[trigger], ['Bulk option']]
        }
    });
});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, (msg, match) => {
    let fromId = msg.from.id;
    let resp = match[1];
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/insult/, (msg, match) => {
    let insults = ['Dumbass', 'Out of 100,000 sperm, you were the fastest?', 'Look, you aint funny. Your life is just a joke.'];
    let chosenInsult = insults[Math.floor(Math.random() * insults.length)];
    bot.sendMessage(msg.from.id, chosenInsult);
});

bot.onText(/\/help/, (msg, match) => {
    bot.sendMessage(msg.from.id, 'This bot just have one single command. \n/insult - Insult you.');
});