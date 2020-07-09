const discord = require ('discord.js');
const config = require('../config');
const bot = new discord.Client();
const fs = require('fs');
const { Collection } = require("discord.js");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./client/commands/");
bot.event = new Collection();

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

bot.on('ready', (message) => {
    console.log(`Logged In As ${bot.user.username}`)
    bot.user.setActivity("m!help", { type: "PLAYING"});
});

bot.on('message', async(message) => {
    let prefix = config.bot.prefix;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);

    if(message.content === 'ping') {
        message.reply('Pong!!!');
    }
});

