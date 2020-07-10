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
            const server = message.guild;
            if(!reason) return message.channel.send("No reason specified");
            if(!server) return message.reply("Your Not In A Server -_-");
            let modlog = message.guild.channels.cache.find(ch => ch.name === 'mod-log');
            
            let embed = new MessageEmbed()
            .setTitle(`**Kicked**`)
            .setColor('RED')
            .setDescription(`**You Were Kicked From ${message.guild.name}**`)
            .addField('Kick By', `${message.author.tag}`, inline)
            .addField('Reason:', reason)
            .setTimestamp()
            user.send(embed);

            if(!modlog) {
                let msg = await message.channel.send("Creating Channel...");
                message.guild.channels.create('mod-log', { reason: 'automatically created mod-log channel' })
               .then(console.log)
               .catch(console.error);
               msg.delete();
            }
            let kickEmbed = new MessageEmbed()
            
        }  
        message.delete();
    }
}