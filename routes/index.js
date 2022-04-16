var express = require('express');
var router = express.Router();
let productosDB = require("../public/javascripts/productosDB.js");
let db = require("../database/models/DefinirTodos");
const obtenerProductos = require("../middlewares/obtenerProductos");


/* GET home page. */
router.get('/inicio',obtenerProductos,function(req, res, next) {
  let usuario;
  if(req.session.usuario){
    usuario = req.session.usuario;
  }
  console.log(req.productos);
  res.render('index',{productos: req.productos, usuario: usuario});
});

module.exports = router;
