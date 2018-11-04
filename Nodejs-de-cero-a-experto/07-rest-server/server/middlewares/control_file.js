const Usuario = require('../modelos/usuario');
const Producto = require("../modelos/producto");

function elementoNoEncontrado(res,nombre_elemento){
    return res.status(400).json({
        ok: false,
        err: {
            message: `${nombre_elemento} no encontrado`
        }
    });
}

let validarSolicitudArchivo=(req,res,next)=>{     
    let tipo = req.params.tipo;
    let id = req.params.id;

    let tipos_peticiones = ['usuarios','productos','categoria']

    if(tipos_peticiones.indexOf(tipo)===-1){
        return res.status(400).json({

            ok:false,
            err:{
                message: "El tipo de solicitud no está permitida, los tipos permitidos son "+tipos_peticiones.join(",")
            
            }
        });
    }

    switch(tipos_peticiones[tipos_peticiones.indexOf(tipo)]){
            case "usuarios":{
                
                Usuario.findById({ _id:id }).exec().then((usuario)=>{
                       if(usuario) next();
                       else elementoNoEncontrado(res,'Usuario');
                }
                    
                ).catch((err)=>{
                   elementoNoEncontrado(res,'Usuario');
                });
    
                break;
            }
            case "productos":{
                Producto.findById({ _id:id }).exec().then((producto)=>{
                    if(producto) next();
                    else elementoNoEncontrado(res,'Producto');   
            }
                
            ).catch((err)=>{
                elementoNoEncontrado(res,'Producto');   
            });
            break;
            }
            case "categoria":{
               // next();

                break;
            }

    }
   

}


let validarFormatoArchivo=(req,res,next)=>{

 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
 let sampleFile = req.files.archivo;

 let extensiones_validas = ['png','jpg','jpeg','gif'];

 let nombre_split = sampleFile.name.split(".");
 let extension_archivo = nombre_split[nombre_split.length-1];


 if( extensiones_validas.indexOf(extension_archivo)===-1){
   return res.status(500).json({
       ok:false,
       err:{
       message:'Extensión no permitida, soló se acepta '+extensiones_validas.join(","),
       extension: extension_archivo
       }
   });
     
}else{
    next();
}

}
module.exports = {
    validarSolicitudArchivo,validarFormatoArchivo
}

