const id = {
    alias: 'id',
    describe: 'id la tarea',
    demandOption: true

}

const argv = require('yargs')
    .command('crear', 'Registra una tarea por hacer', {
        'descripcion': {
            alias: 'd',
            describe: 'representa el nombre o contenido de la tarea',
            demandOption: true
        }

    })
    .command('actualizar', 'Actualizar tareas guardadas', {
        id,
        completado: {
            alias: 'c',
            describe: 'Indica si una tarea ha sido realizada o no',
            default: true

        }


    })
    .command('borrar', 'borrar tareas guardadas', {
        id
    })
    .command('listaFiltrada', 'listar tareas guardadas', {
        completado: {
            alias: 'c',
            describe: 'Filtra las tareas guardadas con el estado recibido',
            default: true

        }
    })

.help()
    .argv

module.exports = {
    argv
}