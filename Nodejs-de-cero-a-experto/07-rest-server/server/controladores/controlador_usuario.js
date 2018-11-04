const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../modelos/usuario');

const auth = require('../middlewares/auth');


app.get('/usuario', auth.validarToken, function(req, res) {


    let desde = Number(req.query.desde || 0); // Son parametros opcionales

    let limite = Number(req.query.limite || 5);

    let estado = Boolean(req.body.estado || true);

    // La segunda cadena indica que campos extraer
    Usuario.find({ estado }, 'nombre email estado img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {


            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado }, (err, cantidad) => {


                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    usuarios,
                    number: cantidad
                });

            })

        });

});


// Crear registro por convención
app.post('/usuario', auth.validarToken, auth.validarRole, function(req, res) {

    let body = req.body;

    let usuario = new Usuario({

        nombre: body.nombre,
        email: body.email,
        password: body.password === undefined ? null : bcrypt.hashSync(body.password, 10),
        role: body.role

    });


    usuario.save((err, answer) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log(`Usuario  agregado : ${answer.nombre}`);
        res.json({
            ok: true,
            usuario: answer
        });

    });

});


// Actualizar
app.put('/usuario/:id', auth.validarToken, auth.validarRole, function(req, res) {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({ ok: true, usuario });


    });



});

// No eliminar, solo bloquear
app.delete('/usuario', auth.validarToken, auth.validarRole, function(req, res) {


    let id = req.body.id;


    if (!id) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Debe enviar un id válido'
            }
        });
    }



    Usuario.findOne({ _id: id, estado: true }, (err, usuario) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }



        usuario.estado = false;
        Usuario.updateOne({ _id: usuario._id }, { usuario }, (err, respuesta) => {


            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                message: 'Usuario eliminado '
            })

        });



    });


});


module.exports = app;