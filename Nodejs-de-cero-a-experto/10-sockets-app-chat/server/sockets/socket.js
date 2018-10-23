const { io } = require("../server");


const { Usuarios } = require("../classes/usuario.js");

let usuarios = new Usuarios();


io.on('connection', (cliente) => {

    console.log('Nuevo usuario');

    cliente.on('ingresarChat', (data, callback) => {
        console.log(data);
        if (!data.usuario) {
            return callback({
                ok: false,
                message: 'El nombre es requerido'
            })

        }
        let personas = usuarios.agregarPersona(cliente.id, data.usuario);
        cliente.broadcast.emit('clientesActivos', personas);

        return callback(personas);
    });

    cliente.on('disconnect', () => {
        usuarios.borrarPersona(cliente.id);
        cliente.broadcast.emit('clientesActivos', usuarios.getPersonas());
    });

});