// Randerizar usuarios
var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');

var sala = params.get('sala');
// referencia JQUERY


var divUsuarios = $("#divUsuarios");
var divChatBox = $('#divChatbox');
var formEnviar = $("#formEnviar");
var textMensaje = $("#textMensaje");

var smallSala = $('#smallSala')

function randerizarSala(){
    console.log('SALA');
    smallSala.html(sala);
}
function randerizarUsuarios(personas) {

    let html = "";
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active">Chat de <span>' + params.get("sala") + '</span></a>';
    html += '</li>';

    console.log("Personas : " + personas.length);
    for (let index = 0; index < personas.length; index++) {

        html += '<li>';
        html += '<a data-id=' + personas[index].id + ' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[index].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }
    divUsuarios.html(html);
}

function renderizarMensaje(mensaje, enviado) {

    var html = '';
    var adminClass='info';
    if(mensaje.usuario==='Administrador'){
        adminClass='danger';
    }

    if(enviado){

       html+=' <li class="reverse">';
       html+=' <div class="chat-content">';
       html+=' <h5>'+ mensaje.usuario + '</h5>';
       html+=' <div class="box bg-light-inverse">' + mensaje.message +' </div>';
       html+=' </div>';
       html+=' <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
       html+=' <div class="chat-time">'+new Date(mensaje.fecha).toLocaleTimeString('en-US')+'</div>';
       html+=' </li>';
    
    }else{
        html += '<li class="animated fadeIn">';
    if(mensaje.usuario!=='Administrador'){
        html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    }
    html += '<div class="chat-content">';
    html += '<h5>' + mensaje.usuario + '</h5>';
    html += '<div class="box bg-light-'+adminClass+'">' + mensaje.message + '</div>';
    html += '</div>';
    html += '<div class="chat-time">'+new Date(mensaje.fecha).toLocaleTimeString('en-US')+'</div>';
    html += '</li>';
 
    }
   
    divChatBox.append(html);
   }


divUsuarios.on('click', 'a', function() {


    let id = $(this).data('id');
    if (id) {

        console.log(id);

    }

});


formEnviar.on('submit', function(e) {

    e.preventDefault();
    if (textMensaje.val().trim().length === 0) {
        return;
    }
    console.log(textMensaje.val());

    // Enviar información
    socket.emit('enviarMensaje', {
        nombre,
        message: textMensaje.val()
    }, function(resp) {
        textMensaje.val('').focus();
        renderizarMensaje(resp,true);
        scrollBottom();
        
    });

});

function scrollBottom() {

  
    var newMessage = divChatBox.children('li:last-child');

    // heights
    var clientHeight = divChatBox.prop('clientHeight');
    var scrollTop = divChatBox.prop('scrollTop');
    var scrollHeight = divChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatBox.scrollTop(scrollHeight);
    }
}