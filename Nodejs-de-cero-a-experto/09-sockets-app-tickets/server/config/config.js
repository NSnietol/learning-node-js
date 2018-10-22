//================PUERTO=================
process.env.PORT = process.env.PORT || 3000;

//================ENTORNO=================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//===================Base de datos ============

let urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI;

process.env.urlDB = 'mongodb://dev_user_pro:DEVmongo8@ds161062.mlab.com:61062/cafe';

//===================VENCIMIENTO DEL TOKEN ============
// Recibe el parametro por segundos
// '1h'
process.env.CADUCIDAD_TOKEN = '12h';

//===================SEED DEL TOKEN ============

process.env.SEED = process.env.SEED || 'D/E/V_S/E/C/R/E/T_2/0/1/8_0/9_1/8';



//==================GOOGLE CLIENT=================
process.env.CLIENT_ID = process.env.CLIENT_ID || "446350097880-5t7k6n37aibf8otk14hdlovp2t74vtu8.apps.googleusercontent.com"