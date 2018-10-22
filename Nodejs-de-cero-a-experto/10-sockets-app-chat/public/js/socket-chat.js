var socket = io();

socket.on("connect", function() {
    
    console.log("Conectado nuevo chat");
    socket.emit('ingresarChat',
    
    {usuario:'Nilson'});

});
  
  socket.on("disconnect", function() {
    console.log("Desconectado  chat");
  });
  