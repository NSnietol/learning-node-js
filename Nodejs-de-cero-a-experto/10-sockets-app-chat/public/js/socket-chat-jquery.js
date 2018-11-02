// Randerizar usuarios
var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');

var sala = params.get('sala');
// referencia JQUERY


let divUsuarios = $("#divUsuarios");

let divChaBox = $('#divChatBox');

let formEnviar = $("#formEnviar");

let textMensaje = $("#textMensaje");



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

function randerizarMensaje(mensaje) {

    var html = '';
    html += '<li class="animated fadeIn">';
    html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html += 'div class="chat-content">';
    html += '<h5>' + mensaje.usuario + '</h5>';
    html += '<div class="box bg-light-info">' + mensaje.message + '</div>';
    html += '</div>';
    html += '<div class="chat-time">10:56 am</div>';
    html += '</li>';

    divChaBox.append(html);
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
    socket.emit('crearMensaje', {
        nombre,
        mensaje: textMensaje.val()
    }, function(resp) {
        textMensaje.val('').focus();
        randerizarMensaje(resp);
    });

});