import mysql  = require('mysql');


export default class MySQL{

private static _instance:MySQL;

cnn:mysql.Connection;
conectado:Boolean=false;
constructor(){
  console.log('Clase inicializada');  
  this.cnn=  mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
  });
}

public static get instance(){
    return this._instance || (this._instance=new this());
}

private conectarDB(){

    this.cnn.connect((err:mysql.MysqlError)=>{

        if(err){
            console.log(err.message);
            return;
        }
        this.conectado=true;
        console.log('Base de datos online!');
    });
}

static ejecutarQuery(query:string,callback:Function){

    this.instance.cnn.query(query,(err,results:Object[],fields)=>{

        if(err){
            console.log('Error query');
            console.log(err);
            return callback(err);
        }

        if(results.length===0){
            callback('El registro no existe')
        }else{
            callback(null,results);
        }
        
    });

}


}
