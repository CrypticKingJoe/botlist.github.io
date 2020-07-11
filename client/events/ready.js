const {Event} = require('klasa');

module.exports = class extends Event {
    run(bot) {
        bot.user.setActivity("m!help", { type: "PLAYING"});
        console.log(`${bot.user.username} is Online`);
    } 
}