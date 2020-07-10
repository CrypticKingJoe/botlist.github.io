const bodyParser = require("body-parser");

const { Router } = require("express");


const bots = require("./bots/");
const auth = require("./auth");
const avatar = require("./avatar");
const embed = require("./embed");
const theme = require("./theme");
const callback = require("./callback");

const route = Router();