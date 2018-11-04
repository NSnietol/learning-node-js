const express = require('express');


const app = express();


app.use(require('./login.js'));

app.use(require('./controlador_usuario'));
app.use(require('./controlador_categoria'));
app.use(require('./controlador_producto'));
app.use(require("./upload"));
app.use(require("./imagenes"));
module.exports = app;