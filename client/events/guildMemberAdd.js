const { Event } = require('klasa');
const config = require('../../config');

module.exports = class extends Event {
    run(member) {
        if (member.user.bot) {
            member.roles.add(member.guild.roles.cache.get(config.discord.BOT_ROLE_ID));
            member.roles.add(member.guild.roles.cache.get(config.discord.UNVERIFIED_ROLE_ID));
        }
    }
};