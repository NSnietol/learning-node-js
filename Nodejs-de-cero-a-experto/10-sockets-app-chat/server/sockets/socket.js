const {io} = require("../server");


io.on('connection',(cliente)=>{

    console.log('Nuevo usuario');
    cliente.on('ingresarChat',(data)=>{
        console.log(data);
    });
    

});