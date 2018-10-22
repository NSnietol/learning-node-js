
var socket= io();


var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio') ){

    window.location='index.html';
    throw new Error("El escritorio es necesario");
}
var escritorio = searchParams.get('escritorio');


if (!/^([0-9])*$/.test(escritorio)){
    window.location='index.html';
    throw new Error("El escritorio debe ser numerico");
}
if (parseInt(escritorio)>4){
    window.location='index.html';
    throw new Error("El escritorio debe ser numerico entre 1 y 4");
}


$("h1").text('Escritorio '+escritorio);

$("button").on('click',function(){

    socket.emit("atenderTicket",{escritorio:escritorio},function(res){

        if(res.ok===false){
            $("#numero-ticket-atendiendo").text(res.message);

            alert(res.message);
            return ;
        }
        $("#numero-ticket-atendiendo").text(res.numero);
    });


});







socket.on("connect",function(){
console.log("Conectado escritorio");
});
    
    
socket.on("disconnect",function(){
console.log("Desconectado escritorio");
});

