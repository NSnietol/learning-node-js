const argv = require('./config/yargs').argv;
const lugar = require('./data/lugar');
const clima = require('./clima/weather');

lugar.getDescripcion(argv.direccion).
then((result) => {

    clima.getClima(result).then((resultado) => {

        console.log(`La temperatura de ${result.direccion} es ${resultado} C`);

    }).catch((error) => {

        console.log(error);
    });


}).catch((error) => {

    console.log("" + error);
});