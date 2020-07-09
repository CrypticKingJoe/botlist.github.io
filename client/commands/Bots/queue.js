const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("../../../models/bots");
const config = require('../../../config');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["q"],
            permLevel: 8
        });
    }

    async run(message) {
        let cont = "";
        let bots = await Bots.find({ state: "unverified" }, { _id: false })

        bots.forEach(bot => { cont += `<@${bot.botid}> : [Invite](https://discord.com/oauth2/authorize?client_id=${bot.botid}&scope=bot&guild_id=${config.discord.guild_id}&permissions=0)\n` })
        if (bots.length === 0) cont = "Queue is empty";

        let embed = new MessageEmbed()
            .setTitle('Queue')
            .setColor(0x6b83aa)
            .setDescription(cont)
        message.channel.send(embed)
    }
};