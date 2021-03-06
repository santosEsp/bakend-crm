const json = require('body-parser');
var express = require('express');
var app = express();
var Negocio = require('../models/negocio');

// ==========================================
//  Obtener todos los negocios
// ==========================================
app.get('/', (req, res) => {

    Negocio.findAll().then(negocios => {
        if (negocios) {
            res.status(200).json({
                ok: true,
                negocios: negocios
            })
        } else {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al obtener negocios'
            })
        }
    })
});

// ==========================================
//  Obtener un negocio
// ==========================================
app.get('/:id', (req, res) => {

    var id = req.params.id;
    Negocio.findOne({
            where: {
                id_negocio: id
            }
        })
        .then(negocio => {
            if (negocio) {
                res.status(200).json({
                    ok: 'true',
                    negocio: negocio
                });
            } else {
                return res.status(400).json({
                    ok: 'false',
                    mensaje: 'No existe el negocio'
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al buscar el negocio',
                error: err
            });
        })
});


// ==========================================
//  Agregar un negocio 
// ==========================================
app.post('/', (req, res) => {
    var body = req.body;

    Negocio.create({
            nombre: body.nombre,
            industria: body.industria,
            ciudad: body.ciudad,
            ingresos_anuales: body.ingresos,
            tipo_cliente: body.tipo,
            no_empleados: body.empleados,
            descripcion: body.descripcion,
            no_telefono: body.telefono,
            zona_horaria: body.zona,
            pagina_corporativa: body.pagina,
            propietario_registro: body.propietario,
            estado_region: body.estado,
            codigo_postal: body.codigo
        })
        .then(negocio => {
            res.status(200).json({
                usuario: negocio,
                ok: 'true',
                mensaje: 'Negocio agregado'
            })
        })
        .catch(err => {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al agregar empresa',
                errors: err
            })
        })
});

// ==========================================
//  Borra un negocio
// ==========================================

app.delete('/:id', (req, res, next) => {

    var id = req.params.id;

    Negocio.destroy({
            where: {
                id_negocio: id
            }
        })
        .then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Negocio eliminado',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al eliminar negocio',
                error: err
            })
        })
});


// ==========================================
//  Actualizar un negocio
// ==========================================

app.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Negocio.update({

            nombre: body.nombre,
            apellido: body.apellido,
            correo: body.correo,
            telefono: body.telefono,
            departamento: body.departamento,
            propietario_registro: body.pripietario
        }, {
            where: {
                id_negocio: id
            }
        }).then(result => {
            res.status(200).json({
                ok: 'true',
                mensaje: 'Negocio actualizado',
                result: result
            })
        })
        .catch(err => {
            res.status(400).json({
                ok: 'false',
                mensaje: 'Error al actualizar negocio',
                error: err
            })
        })
});

module.exports = app;