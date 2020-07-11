const http = require('http');
require('dotenv').config();
//require("module-alias/register");
const config = require('./config');
var fs = require('fs');
const mongoose = require('mongoose');
var express = require('express');
var createError = require('http-error');
var app = express();
const colors = require('colors');
const App = require('./structures/app.js');
const bot = require('./client/bot');

  let botname = "Muge";

    //CONNECT TO THE DATABASE
    mongoose.connect(`${config.database.MONGO_DB_URL}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(colors.yellow(`Connected to the database on `) + colors.underline.green(MONGO_DB_URL));
    //Logged In The Bot
    let client = bot.init(config.discord.token);
    console.log(colors.yellow(`Logged in as `) + colors.underline.green(botname));
    //Listen To The Server Port
     new App(client).listen(config.port || 8080);
    console.log(colors.yellow(`Running on port `) + colors.underline.green(config.port || 8080));