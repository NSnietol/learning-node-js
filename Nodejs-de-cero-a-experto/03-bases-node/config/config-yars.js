const argv = require("yargs")
    .command('run', 'Generar archivo con las tablas de multiplicación', {
        base: {
            alias: 'b',
            describe: 'Es la base de la tabla',
            demand: true
        },
        limite: {
            alias: 'lim',
            describe: 'Define el limite de la tabla a generar',
            default: 10
        }
    })
    .help()
    .argv

module.exports = {
    argv
}