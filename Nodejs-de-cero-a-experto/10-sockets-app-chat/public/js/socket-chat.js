var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala') || params.get('nombre')==='Administrador') {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('ingresarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
        randerizarUsuarios(resp);
        randerizarSala();
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});




// Escuchar información
socket.on('enviarMensaje', function(mensaje) {
    renderizarMensaje(mensaje);
    scrollBottom();
    console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('clientesActivos', function(personas) {
    console.log('Recien conectado');
    randerizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});