const discord = require ('discord.js');
const config = require('../config');
const client = new discord.Client();

client.on('ready', (message) => {
    console.log(`Logged In As ${client.user.username}`)

});


client.login(config.discord.token);