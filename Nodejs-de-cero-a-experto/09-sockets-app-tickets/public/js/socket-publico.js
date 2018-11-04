var socket = io();

//--------------------------------------------------------------

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];

var lblEscritorios = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4
];
//---------------------------------------------------------------
socket.on("connect", function() {
  console.log("Conectado nuevo ticket");
 
});

socket.on("disconnect", function() {
  console.log("Desconectado nuevo ticket");
});

socket.on("estadoActual", function(data) {
 actualizarHTML(data.tickets_en_atencion);
});

socket.on('actualizandoAtencion',function(data){
    console.log('Actualizando atencion');
  
    actualizarHTML(data.tickets_en_atencion);

});
function actualizarHTML(tickets_en_atencion){

    var audio = new Audio("../audio/new-ticket.mp3");
    audio.play();
  
     console.log(tickets_en_atencion);
    for(var i=0;i<=tickets_en_atencion.length-1;i++){

        var numero_escritorio=tickets_en_atencion[i].escritorio;
        lblTickets[numero_escritorio-1].text('Ticket '+tickets_en_atencion[i].numero);
        lblEscritorios[numero_escritorio-1].text('Escritorio '+tickets_en_atencion[i].escritorio);

    }

}