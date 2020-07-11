const { Router } = require("express");
var express = require('express');

const bots = require("./bots/index");
const api = require("./api/index");
const theme = require("./theme");

const join = require("./join");
const login = require("./login");
const logout = require("./logout");
const user = require("./user");
const me = require("./me");


const route = Router();
const app = express();

route.use("/bots", bots);
route.use("/api", api);
route.use("/theme", theme);


route.use("/join", join);
route.use("/logout", logout);
route.use("/login", login);
route.use("/user", user);
route.use("/me", me);


route.get('/', (req, res) => {
    if (!req.query.q) res.render('index');
    else res.redirect(`/bots/search?q=${encodeURIComponent(req.query.q)}`)
});

module.exports = route;