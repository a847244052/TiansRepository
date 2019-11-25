const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    if (req.url == '/favicon.ico') {
        res.writeHead(200);
        res.end();
    }
    res.writeHead(200);
    // res.end('hello');
    fs.createReadStream(__dirname + '/httpService.html').pipe(res);
}).listen(3000);

// to do koa