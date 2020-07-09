const { Router } = require("express");
const { discord, url_link } = require('../config');

const route = Router();

route.get("/", async (req, res, next) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${discord.client_id}&response_type=code&scope=identify&redirect_uri=${encodeURIComponent(url_link)}/api/callback`);
});

module.exports = route;