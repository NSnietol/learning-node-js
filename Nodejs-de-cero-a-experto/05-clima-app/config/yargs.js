const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        demand: true,
        desc: 'Cuidad solicitada'


    }

}).argv;


module.exports = {
    argv
}