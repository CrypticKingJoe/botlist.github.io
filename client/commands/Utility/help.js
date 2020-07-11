// This is just to disable automatic help command
const { Command } = require('klasa');
const {MessageEmbed, Message} = require('discord.js');
const { stripIndents } = require("common-tags");


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            usage: '[help:args[1]]'
    });
    }
    async run(bot,message,[args]) {
        if (args[0]) {
            getCMD(bot,message,args[1]);
        } else {
            return getAllCmd(bot, message);
        }
    }
};

async function getAllCmd(bot,message) {
        let embed = new MessageEmbed()
        .setColor("WHITE")
        .setTitle('Command')
        const commands = (category) => {
            return bot.command
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
        }
        const info = bot.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

        return message.channel.send(embed.setDescription(info));
}

function getCMD(bot, message, input) {
    const embed = new MessageEmbed()
    
    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
   
    return message.channel.send(embed.setColor("WHITE").setDescription(info));
}