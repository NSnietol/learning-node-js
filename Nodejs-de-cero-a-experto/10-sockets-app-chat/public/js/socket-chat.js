import { notificacion } from "./notificacion_push.js";

var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("usuario") || !searchParams.has("sala")) {
  window.location = "index.html";
  throw new Error("El usuario y sala  es necesario");
}

let usuario = searchParams.get("usuario");

socket.on("connect", function() {
  console.log("Conectado nuevo usuario");

  socket.emit("ingresarChat", { usuario }, function(resp) {
    $("#nombreUsuario").text(usuario);

    console.log("Usuario nuevo side-cliente");
    //     console.log("Lista de usuarios", resp);
  });

  socket.on("enviarMensaje", data => {
    if (data.usuario) {
      notificacion(data.usuario);
      $("#chat").text(
        $("#chat").val() +
          "\n" +
          "Nombre :" +
          data.usuario +
          "\nMensaje:" +
          data.message
      );
    } else {
      console.log("Informacion sin usuario");
    }
  });

socket.on("mensajePrivaod",data=>{


  console.log('Mensaje privado');
});

  socket.on("clientesActivos", (data) => {
    console.log("Usuarios activos", data);
  });

  $("#EnviarSaludo").keypress(function(e) {
    var key = e.which;
    if (key == 13) {
      // the enter key code
      enviarNuevoMensaje();
    }
  });

  $("#EnviarSaludo").on("click", function() {
    enviarNuevoMensaje();
  });


});

function enviarNuevoMensaje() {
  let message = $("#nuevo-mensaje").val();

  socket.emit("enviarMensaje", {
    usuario,
    message
  });

  $("#chat").text(
    $("#chat").val() + "\n" + "Nombre :" + usuario + "\nMensaje:" + message
  );

  $("#mensaje").empty();
}
socket.on("disconnect", function() {
  notificacion();
  console.log("Desconectado  chat");
});
