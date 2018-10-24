var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('usuario')) {

    window.location = 'index.html';
    throw new Error("El usuario es necesario");


}

let usuario = searchParams.get('usuario');

socket.on("connect", function() {

    console.log("Conectado nuevo usuario");
    socket.emit('ingresarChat', { usuario },
        function(resp) {
            //     console.log("Lista de usuarios", resp);
        });


    socket.on('enviarMensaje', (data) => {
        console.log('Servidor ', data);
    });

    socket.on('clientesActivos', (data) => {
        console.log('Usuarios activos', data);
    })

});

socket.on("disconnect", function() {
    console.log("Desconectado  chat");
});