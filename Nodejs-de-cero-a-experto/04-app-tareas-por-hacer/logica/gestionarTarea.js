const fs = require('fs');

let listaPorHacer = [];


const guardardb = () => {

    let data = JSON.stringify(listaPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

}


const cargardb = () => {


    try {


        listaPorHacer = require("../db/data.json");

    } catch (error) {
        listaPorHacer = [];
    }
    return listaPorHacer;

}

const crear = (descripcion) => {

    cargardb();


    let porHacer = {
        descripcion,
        completado: false,
        id: listaPorHacer.length

    };

    listaPorHacer.push(porHacer);
    guardardb();
    return porHacer;
}



const listarTareasFiltro = (estado) => {

    cargardb();
    return listaPorHacer.filter(tarea => tarea.completado == estado);
}

const actualizar = (id, completado = true) => {


    if (id < 0) {
        throw new Error("No existe el id : " + id);
    } else {
        listaPorHacer = cargardb();

        for (let index = 0; index < listaPorHacer.length; index++) {
            let element = listaPorHacer[index];


            if (element.id == id) {
                element.completado = completado;
                guardardb();
                return element;
            }

        }

        throw new Error(`Error !, no fue encontrado el id : ${id}`);

    }
}


const borrarTarea = (id) => {

    cargardb();

    if (id < 0) {
        throw new Error("No existe el id : " + id);
    } else {
        cargardb();

        if (listaPorHacer.filter(tarea => tarea.id == id).length == 0) {
            throw new Error("No existe el id : " + id);

        } else {

            listaPorHacer = listaPorHacer.filter(tarea => tarea.id != id);
            guardardb();
        }
        return "Actualización realizada : \n";



    }
}
const getListado = () => {

    return cargardb();
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrarTarea,
    listarTareasFiltro
}