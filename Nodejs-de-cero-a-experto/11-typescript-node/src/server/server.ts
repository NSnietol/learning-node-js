
import express = require('express');
import path = require('path');

export default class Server{

public app:express.Application;
public port: Number;

constructor(port:Number){
    this.port=port;
    this.app=express();
}

static init(port:Number){
    return new Server(port);
}

start(callback:Function){
    this.app.listen(this.port,callback);
    this.publicFolder();
}


private publicFolder(){
    const publicPath = path.resolve(__dirname, '../public');
    this.app.use(express.static(publicPath));
    
}

}