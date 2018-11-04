const http = require('http');

http.createServer((resq, answ) => {

    answ.writeHead(200, { 'Content-Type': 'application/json' })
    answ.write(JSON.stringify({ nombre: 'Nilson' }));
    answ.end()

}).listen(8080);

console.log(('Puerto 8080'));