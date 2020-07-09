const http = require('http');
const config = require('./config');
var fs = require('fs');
var express = require('express');
var createError = require('http-error');
var app = express();


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bot = require('./client/bot');


http.createServer(function (request, response) {

    // baca file
    fs.readFile('index.html', (err, data) => {
        if (err) throw err;
        
        // kirim respon
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}).listen(config.port);


console.log("server running on http://localhost:8000");
(async () => {
let client = bot.init(config.discord.token);
console.log(colors.yellow(`Logged in as `) + colors.underline.green(client.user.username));
});

module.exports = app;