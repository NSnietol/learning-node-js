const { io } = require("../server");

const { Usuarios } = require("../classes/usuario.js");
const { crearMensaje } = require("../utils/util");

let usuarios = new Usuarios();

io.on("connection", cliente => {
  console.log("Nuevo usuario");

  cliente.on("ingresarChat", (data, callback) => {
    console.log(data);
    if (!data.usuario) {
      return callback({
        ok: false,
        message: "El nombre es requerido"
      });
    }
    let personas = usuarios.agregarPersona(cliente.id, data.usuario);

    cliente.broadcast.emit(
      "enviarMensaje",
      crearMensaje("Admin", data.usuario + " ingresó")
    );

    cliente.broadcast.emit("clientesActivos", personas);

    return callback(personas);
  });

  cliente.on("enviarMensaje", data => {
    console.log("Mensaje desde cliente", data);
    let nombre = usuarios.getPersona(cliente.id).persona.nombre;

    if (nombre) {
      console.log("OK solicitud, enviar a todos");
      cliente.broadcast.emit(
        "enviarMensaje",
        crearMensaje(nombre, data.message)
      );
    }
  });

  cliente.on("mensajePrivado", data => {
    let persona = usuarios.getPersona(cliente.id);

    if (persona) {
      cliente.broadcast
        .to(data.id_destino)
        .emit("mensajePrivado", crearMensaje(persona.nombre, data.message));
    }
  });

  cliente.on("mensajePrivado", data => {
    let persona = usuarios.getPersona(cliente.id);

    if (persona) {
      cliente.broadcast
        .to(data.id_destino)
        .emit("mensajePrivado", crearMensaje(persona.nombre, data.message));
    }
  });

  cliente.on("disconnect", () => {
    let data = usuarios.borrarPersona(cliente.id);

    cliente.broadcast.emit(
      "enviarMensaje",
      crearMensaje(
        "Administrador",
        `${data.personaBorrada.persona.nombre} abandonó el chat`
      )
    );

    cliente.broadcast.emit("clientesActivos", usuarios.getPersonas());
  });
});
