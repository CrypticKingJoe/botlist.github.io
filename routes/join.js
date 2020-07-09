const { Router } = require("express");
const {discord} = require('../config');

const route = Router();

route.get("/", async (req, res, next) => {
    res.redirect(discord.GUILD_INVITE)
});

module.exports = route;