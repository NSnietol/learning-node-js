const express = require("express");
const fs = require("fs");
const path = require("path");
const auth = require('../middlewares/auth');


const app = express();



app.get("/imagen/:tipo/:img", auth.validarTokenImg,(req,res)=>{

    let tipo = req.params.tipo;
    let img = req.params.img;

    let path_img =  `../../uploads/${tipo}/${img}`;

    path_img =  path.resolve(__dirname,path_img);
 
    if(fs.existsSync(path_img)){

        res.sendFile(path_img);

    }else{
        let img_default= path.resolve(__dirname,"../assets/no-image.jpg");

        res.sendFile(img_default);
    }
  



});

module.exports=app;