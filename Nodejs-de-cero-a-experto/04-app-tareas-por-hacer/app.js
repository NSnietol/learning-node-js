const argv = require("./config/config-yargs").argv;
const colors = require('colors');
const gestionarTask = require("./logica/gestionarTarea");

let comando = argv._[0];

switch (comando) {

    case 'crear':
        {

            console.log('Crear tarea '.green);

            console.log(gestionarTask.crear(argv.d));

            break;
        }

    case 'listar':
        {
            console.log('Listar'.green);
            console.log(gestionarTask.getListado());
            break;
        }

    case 'actualizar':
        {
            console.log('Actualizar'.green);
            console.log(gestionarTask.actualizar(parseInt(argv.id), argv.c));
            break;
        }

    case 'borrar':
        {
            console.log('Borrar'.green);
            console.log(gestionarTask.borrarTarea(parseInt(argv.id)));
            break;
        }


    case 'listaFiltrada':
        {
            console.log('lista Filtrada '.green);
            console.log("Valor : " + argv.completado);
            console.log(gestionarTask.listarTareasFiltro(argv.completado));
            break;
        }



    default:
        {
            console.log('(x) Comando invalido'.red);
        }



}