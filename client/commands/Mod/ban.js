const {MessageEmbed} = require('discord.js');
const {Command} = require('klasa');
const {discord} = require('../../../config');


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            permissionLevel: 6,
            requiredPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
            description: 'Ban Those Evil Person.',
            usage: '[user][reason]',
            usageDelim: ' ',
            cooldown: 1000
        });
    }

     async run(message, [user, reason]) {
         if(!user) {    
            return message.channel.send("You Must Ping A User To Ban Them. :)");
        } else {
            
        }
         if (user.id === message.client.user.id) return message.channel.send(`YOU CANT KICK ME`);
      }
}