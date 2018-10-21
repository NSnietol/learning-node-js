    var socket = io();
    
    socket.on('connect',function(){
        console.log('Conectado al servidor');
    });

    socket.on('disconnect',function(){
        console.log('Perdimos la conexión con el servidor');
    });

    socket.on('enviarMensaje',function(mensaje){
         console.log("Mensaje by Admin : ",mensaje);
    });

    socket.emit('enviarMensaje',{
        usuario:'Cliente ',
        mensaje:'Mensaje 1'
    },function(resp){

        console.log("mensaje del server :",resp);
    });

