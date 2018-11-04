const fs = require('fs');

const color = require("colors");


let crearInforme = (base, limite = 10) => {



    return new Promise((resolve, reject) => {


        if (!Number(base)) {
            throw new Error('La base introducida no es un número');
        }
        let data = "";

        for (let index = 1; index <= limite; index++) {
            data += (`${base} * ${index} : ` + index * base) + "\n";

        }


        fs.writeFile(`./archivos/tabla-${base}.txt`, data, (err) => {

            if (err) reject(err);
            else { resolve(`Archivo creado : `.white + `tabla-${base}-al-${limite}.txt`.green); }

        });


    });



}

module.exports = {
    crearInforme

}