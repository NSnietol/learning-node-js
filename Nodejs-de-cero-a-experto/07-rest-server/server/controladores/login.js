const express = require("express");

const app = express();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const _ = require("underscore");

const Usuario = require("../modelos/usuario.js");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

app.post("/auth", (req, res) => {
    let body = req.body;

    if (!body.email || !body.password) {
        return res.status(400).json({
            ok: false,
            message: "Email y contraseña son requeridos "
        });
    }

    Usuario.findOne({ email: body.email }, (err, usuario) => {
        if (usuario === undefined || err || usuario == null) {
            return res.status(400).json({
                ok: false,
                message: usuario == undefined ? "Email o contraseña incorrecta " : err
            });
        }

        if (bcrypt.compareSync(body.password, usuario.password)) {
            let token = jwt.sign({
                    usuario
                },
                process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
            );

            return res.json({
                ok: true,
                usuario,
                token
            });
        } else {
            return res.status(400).json({
                ok: false,
                message: "Email o contraseña incorrecta "
            });
        }
    });
});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    };
}

app.post("/signgoogle", (req, res) => {
    let token = req.body.idtoken;

    if (!token) {
        return res.status(400).json({
            ok: "false",
            message: "Se requiere el token"
        });
    }

    verify(token)
        .then(user => {
            Usuario.findOne({ email: user.email }, (err, usuarioBD) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: usuarioBD == undefined ? "Email o contraseña incorrecta " : err
                    });
                }
                if (usuarioBD) {
                    if (usuarioBD.google === false) {
                        return res.status(400).json({
                            ok: false,
                            err: {
                                message: "Debe usar la autenticación básica"
                            }
                        });
                    } else {

                        let token = jwt.sign({
                                usuario: usuarioBD
                            },
                            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
                        );

                        return res.json({
                            ok: true,
                            usuario: usuarioBD,
                            token
                        });
                    }
                    // Crear el usuario con los datos de google
                } else {
                    let usuario = new Usuario();
                    usuario.nombre = user.nombre;
                    usuario.email = user.email;
                    usuario.img = user.img;
                    usuario.password = "google_account";
                    usuario.google = true;
                    usuario.save((err, nuevoUsuario) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                err
                            });
                        }
                        let token = jwt.sign({
                                usuario: nuevoUsuario
                            },
                            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
                        );

                        return res.json({
                            ok: true,
                            usuario: nuevoUsuario,
                            token
                        });
                    });
                }
            });
        })
        .catch(err => {
            res.status(403).json({
                ok: false,
                err
            });
        });

    //console.log(token);
});

module.exports = app;