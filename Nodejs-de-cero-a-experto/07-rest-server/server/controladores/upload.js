const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../modelos/usuario');
const Producto = require("../modelos/producto");
const control_file = require('../middlewares/control_file');
const fs = require('fs');
const path= require("path");


// default options, setea los archivos que se estan subiendo 
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath:true,
    abortOnLimit:true,

}));

app.put('/upload/:tipo/:id', control_file.validarSolicitudArchivo,control_file.validarFormatoArchivo,function(req, res) {
 
    let tipo = req.params.tipo;
    let id = req.params.id;
 
 
    if (Object.keys(req.files).length == 0) {
 
        return res.status(400).json({
            ok:false,
            err:{
                message:'El archivo no fue adjuntado'
            }
         });
    }

  let sampleFile = req.files.archivo;

  let nombre_split = sampleFile.name.split(".");
  let extension_archivo = nombre_split[nombre_split.length-1];

  let nombre_archivo = `${id}-${new Date().getMilliseconds()}.${extension_archivo}`;

  // Use the mv() method to place the file somewhere on your server
  
  sampleFile.mv(`uploads/${tipo}/${nombre_archivo}`, (err)=> {
    if (err)
      return res.status(500).json({
        ok:false, 
        err
    });

    actualizarImagen(req,res,nombre_archivo);
  });
});


async function  actualizarImagen(req,res,nombre_archivo){
    let tipo = req.params.tipo;
    let id = req.params.id;
    
    switch(tipo){

        case "usuarios":{
            // Como se valida que ya existe el usuario antes de llegar a este punto no se maneja el error

            let usuarioBD=await Usuario.findById({_id:id});

            console.log("Nombre : "+nombre_archivo);
            Usuario.findByIdAndUpdate({ _id: id },  { img: nombre_archivo },{ new: true })
            .exec()
            .then((usuario)=>{
                if(usuario){
                eliminarImagen(usuarioBD.img,tipo);                   
                res.send({
                    ok:true,
                    usuario,
                    message:'Imagen actualizada!'});
                }else elementoNoEncontrado("Usuario");
                
            })
            .catch((err)=>{
                eliminarImagen(nombre_archivo,'usuarios')

                elementoNoEncontrado("Usuario");

            });

            break;
        }
        
        case "productos":{

            let productoBD = await Producto.findById({_id:id});


            Producto.findByIdAndUpdate({ _id: id }, { $set: { img: nombre_archivo }})
            .exec()
            .then((producto)=>{
                if(producto){
                 eliminarImagen(productoBD.img,tipo);                 
                res.send({
                    ok:true,
                    producto,
                    message:'Imagen actualizada!'});
                }else elementoNoEncontrado("Producto");
                
            })
            .catch((err)=>{
                eliminarImagen(nombre_archivo,'productos')
                elementoNoEncontrado("Producto");

            });

            break;
        }

    }


}

function elementoNoEncontrado(res,nombre_elemento){
    return res.status(400).json({
        ok: false,
        err: {
            message: `${nombre_elemento} no actualizado`
        }
    });
}

function eliminarImagen(id_img,tipo){

    let path_imagen =path.resolve(__dirname,`../../uploads/${tipo}/${id_img}`);

    if(fs.existsSync(path_imagen)){
        fs.unlinkSync(path_imagen);
    }
    
}
module.exports=app;