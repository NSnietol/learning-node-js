
var socket= io();


socket.on("connect",function(){
console.log("Conectado nuevo ticket");

});


socket.on("disconnect",function(){
console.log("Desconectado nuevo ticket");
});


socket.on('estadoActual',function(data){

    
$("#lblNuevoTicket").text(`Último ticket asignado : ${data.actual}`);

});

$('#generarTicket').on('click',function(){

    $("#lblNuevoTicket").text("Cargando...")
    socket.emit("siguienteTicket",null,function(data){

        $("#lblNuevoTicket").text(`Ticket ${data.number_ticket}`);
   
    });
});

