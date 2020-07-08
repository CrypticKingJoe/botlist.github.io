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

}).listen(config.port);


console.log("server running on http://localhost:8000");