const {io} = require("../server");

io.on('connection',(cliente)=>{

    console.log("Cliente conectado "+cliente);

    cliente.emit('enviarMensaje',{
        usuario:'Admin',
        mensaje:'Bienvenido'
    },(err,res)=>{

        if(err) console.log("Morimos");
    });

    cliente.on('disconnect',()=>{
        console.log("El cliente se desconectó");
    });

    cliente.on('enviarMensaje',(data,callback)=>{
        console.log("Mensaje by Cliente ",data);

        cliente.broadcast.emit('enviarMensaje',data);
       // if(mensaje.usuario){
        //    callback("TODO BIEN");
        //}else callback("TODO MAL :(");
      //  ;

    });
});