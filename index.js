const http = require('http');
const config = require('./config');
var fs = require('fs');

http.createServer(function (request, response) {

    // baca file
    fs.readFile('index.html', (err, data) => {
        if (err) throw err;
        
        // kirim respon
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });

    fs.readFile('client/bot.js', (bot, err) => {
        if(err) throw err;

        response.writeHead(100, {'Content-Type': 'text/js'});
        response.write(bot);
        response.end();
    } )

}).listen(config.port);


console.log("server running on http://localhost:8000");