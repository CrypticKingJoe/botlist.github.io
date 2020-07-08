const discord = require ('discord.js');
const config = require('../config');
const client = new discord.Client();

client.on('ready', (message) => {
    console.log(`Logged In As ${client.user.username}`)

});

client.on('message', (message) => {
    let prefix = config.bot.prefix;
    if(message.content === prefix + ' ping') {
        message.reply('PONG!!!');
    }
});


client.login(config.discord.token);