const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Users = require('../../../models/users');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["user-info", "user info"],
            usage: '[User:user]'
        });
    }

    async run(message, [user]) {
        if(!user) return message.channel.send('Please Ping A **User**');
        if(!user || user.bot) return message.channel.send('That Is A Bot Please Ping A Real user');
        if (user.id === message.client.user.id) return message.channel.send(`-_- No`);
        let userico = user.displayAvatarURL();
        let embed = new MessageEmbed()
		.addField("Username", user.tag)
		.addField("ID", user.id)
        .addField("Status", user.presence.status)
        .addField("Created", user.createdAt)
        .setThumbnail(userico)
        .setTimestamp()
        .setColor('WHITE')
        .setFooter(`Requested By: ${message.author.tag}`)
		message.channel.send(embed)
    }
};