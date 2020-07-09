const discord = require ('discord.js');
const config = require('../config');
const client = new discord.Client();


const { Client, Schema } = require('klasa');

Client.defaultPermissionLevels
    .add(8, ({ c, author }) => config.discord.admin_role_id.split(' ').includes(author.id));

const client = new Client({
    commandEditing: true,
    prefix: config.bot.prefix,
    production: true,
    consoleEvents: {
        log: false,
        error: false,
        warn: false
    },
    disabledCorePieces: ["commands"]
});

module.exports.init = async (token) => {
    client.userBaseDirectory = __dirname;    
    client.login(token);
    return client;
}

client.on('ready', (message) => {
    console.log(`Logged In As ${client.user.username}`)

});

client.on('message', (message) => {
    let prefix = config.bot.prefix;
    if(message.content === prefix + ' ping') {
        message.reply('PONG!!!');
    }
});

