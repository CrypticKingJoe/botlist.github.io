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
const { PORT, DISCORD_TOKEN, MONGO_DB_URL } = process.env;
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bot = require('./client/bot');


(async () => {
    await mongoose.connect(`${MONGO_DB_URL}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(colors.yellow(`Connected to the database on `) + colors.underline.green(MONGO_DB_URL));
    let client = await bot.init(DISCORD_TOKEN);
    console.log(colors.yellow(`Logged in as `) + colors.underline.green(client.user.tag));
    await new App(client).listen(PORT || 8080);
    console.log(colors.yellow(`Running on port `) + colors.underline.green(PORT || 8080));
})()