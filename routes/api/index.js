const bodyParser = require("body-parser");

const { Router } = require("express");


var normalizedPath = require("path").join(__dirname, "bots");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./bots/" + file);
});
const auth = require("./auth");
const avatar = require("./avatar");
const embed = require("./embed");
const theme = require("./theme");
const callback = require("./callback");

const route = Router();