const express = require('express');

const app = express();

const _ = require('underscore');

const Categoria = require('../modelos/categoria');

const Usuario = require("../modelos/usuario");

const Producto = require("../modelos/producto");

const auth = require('../middlewares/auth');


app.get("/productos/buscar/:termino",auth.validarToken,(req, res)=>{

    let termino = req.params.termino;

    let regex = new RegExp(termino,'i');

    Producto.find({nombre:regex, disponible:true})
        .populate("categoria","nombre")
        .exec((err,productos)=>{

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok:true,
                productos,
                total:productos.length
            });


        });


});



app.post("/producto", auth.validarToken, (req, res) => {


    let body = req.body;

    console.log(body);
    let producto = new Producto({
        usuario: req.usuario._id,
        descripcion: body.descripcion,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria

    });
    console.log(producto);

    producto.save((err, answer) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log(`Producto creado : ${answer.descripcion}`);
        res.json({
            ok: true,
            producto: answer
        });

    });

})


//Obtener productos, paginados y con populate usuario, categoria


app.get("/productos", auth.validarToken, (req, res) => {
    let desde = Number(req.query.desde || 0); // Son parametros opcionales

    let limite = Number(req.query.limite || 5);

    let estado = Boolean(req.body.estado || true);

    Producto.find({})
        .sort("nombre")
        .populate("usuario", 'nombre email')
        .populate("categoria", 'descripcion')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Producto.countDocuments({}, (err, cantidad) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    productos,
                    number: cantidad
                });

            })

        });

});


app.get("/productos/:id", (req, res) => {
    let _id = req.params.id;

    Producto.find({ _id })
        .populate("usuario", 'nombre email')
        .populate("categoria", 'descripcion')

    .exec((err, producto) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto

        });

    });
});

//Actualizar producto

app.put("/productos/:id", (req, res) => {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion']);


    if (!id || id.length < 20) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Debe enviar un id válido'
            }
        });
    }

    Producto.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true }, (err, producto) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({ ok: true, producto });

    });
});

// Borrar producto, cambiar estado disponible
app.delete("/productos/:id", auth.validarToken, (req, res) => {
    let id = req.params.id;


    if (!id || id.length < 20) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Debe enviar un id válido'
            }
        });
    }

    Producto.findOneAndUpdate({ _id: id }, { disponible: false }, { new: true, runValidators: true }, (err, producto) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({ ok: true, producto });

    });
});


module.exports = app;