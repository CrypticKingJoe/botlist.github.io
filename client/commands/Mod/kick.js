const {MessageEmbed} = require('discord.js');
const {Command} = require('klasa');

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

    async run(message, [user, args]) {
        if(!user) {
            message.channel.send();
        } else {
            if(user.id === message.author.id) {
                return message.reply('You Cant Kick Yourself LOL');
            }
            let reason = args.join(" ").slice(22);
            
        }
    }
}