import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

const server = Server.init(3400);

MySQL.instance;


server.app.use(router);

server.start(()=>{

console.log('Servidor corriendo en el puerto : '+server.port);
});


console.log('Codigo TypeScript');