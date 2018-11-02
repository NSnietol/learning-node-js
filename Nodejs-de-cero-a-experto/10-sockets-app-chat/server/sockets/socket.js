const { io } = require("../server");

const { Usuarios } = require("../classes/usuario.js");
const { crearMensaje } = require("../utils/util");

let usuarios = new Usuarios();

io.on("connection", cliente => {
    console.log("Nuevo usuario");

    cliente.on("ingresarChat", (data, callback) => {
        console.log("INgresadno", data);
        if (!data.nombre || !data.sala) {
            return callback({
                ok: false,
                message: "El nombre y la sala es requerido"
            });
        }

        cliente.join(data.sala);

        usuarios.agregarPersona(cliente.id, data.nombre, data.sala);

        // cliente.broadcast.emit(
        //   "enviarMensaje",
        //   crearMensaje("Admin", data.usuario + " ingresó")
        // );

        let personas = usuarios.getPersonasPorSala(data.sala);
        cliente.broadcast.to(data.sala).emit("clientesActivos", personas);

        return callback(personas);
    });

    cliente.on("enviarMensaje", data => {


        let persona = usuarios.getPersona(cliente.id).persona;

        if (persona) {
            console.log("OK solicitud, enviar a todos");
            let mensaje = crearMensaje(persona.usuario, data.message);
            cliente.broadcast.to(persona.sala).emit(
                "enviarMensaje",
                mensaje
            );
            callback(mensaje);
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
        let data = usuarios.borrarPersona(cliente.id).personaBorrada;



        cliente.broadcast.to(data.persona.sala).emit(
            "enviarMensaje",
            crearMensaje(
                "Administrador",
                `${data.persona.nombre} abandonó el chat`
            )
        );

        cliente.broadcast.to(data.persona.sala).emit("clientesActivos", usuarios.getPersonasPorSala(data.persona.sala));
    });


});