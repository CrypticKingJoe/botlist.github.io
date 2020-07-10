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

     async run(message, [user, args]) {
         if(!user) {    
            return message.channel.send("You Must Ping A User To Ban Them. :)");
        } else {
            if(user.id === message.author.id) {
                return message.reply('You Cant Ban Yourself LOL');
            }
            let reason = args.join(' ').slice(22);
            var server = message.guild;
            if(!reason) return message.channel.send("No reason specified");
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                return message.channel.send('Sorry You Dont Have Permission To Ban User');
            }
            let inline = true;
            let embed = new MessageEmbed()
            .setTitle(`**Banned**`)
            .setColor('PURPLE')
            .setDescription(`**You Were Banned From ${message.guild.name}**`)
            .addField('Banned By', `${message.author.tag}`, inline)
            .addField('Reason:', reason)
            .setTimestamp()
            user.send(embed);

            let modlog = message.guild.channels.cache.find(ch => ch.name === 'mod-log');

            let banEmbed = new MessageEmbed()
            .setTitle('**Ban**')
            .setColor('PURPLE')
            .addField('Kicked User', `${toBan} with ID: ${toBan.id}`)
            .addField('Kicked By', `<@${message.author.id}> with ID: ${message.author.id}`)
            .addField('Kicked From', `${message.channel}`)
            .addField('Reason', `${reason}`)
            .setTimestamp(new Date())
            .setFooter('RIP');
            if(!modlog) {
               let msg = await message.channel.send("Creating Channel...");
                message.guild.channels.create('mod-log', { reason: 'automatically created mod-log channel' })
               .then(console.log)
               .catch(console.error);
               msg.delete();
            }
            message.guild.member(user).ban(reason);
            modlog.send(banEmbed);
        }
         message.delete();
         if (user.id === message.client.user.id) return message.channel.send(`YOU CANT KICK ME`);
      }
}