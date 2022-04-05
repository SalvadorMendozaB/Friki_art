let productosDB = require("../public/javascripts/productosDB.js");
const Productos = require("../database/models/Product.js");
const { validationResult } = require("express-validator");

const controlador = {
  detalleProducto: function (req, res) {
    console.log("Entre a detalle");
    let producto = productosDB.obtenerProducto(req.params.id);
    res.render("productos/detalleProducto", {
      producto: producto,
      usuario: req.session.usuario,
    });
  },
  carritoCompra: function (req, res) {
    res.render("productos/carritoCompra", { usuario: req.session.usuario });

    res.render("carritoCompra");
  },
  cargarVistaCrear: function (req, res) {
    productosDB.obtenerUltimoId();
    res.render("productos/agregarProducto", { usuario: req.session.usuario });
  },
  cargarVistaEditar: function (req, res) {
    let producto = productosDB.obtenerProducto(req.params.id);
    res.render("productos/editarProducto", {
      producto: producto,
      usuario: req.session.usuario,
    });
  },
  actualizarProducto: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      producto = productosDB.obtenerProducto(req.params.id);
      producto.nombre = req.body.nombre;
      producto.categoria = req.body.categoria;
      producto.colores = req.body.colores;
      producto.descripcion = req.body.descripcion;
      producto.precio = req.body.precio;
      if (req.file) {
        producto.imagen = req.file.filename;
      }
    } else {
        console.log(errors);
      req.body.id = req.params.id;
      res.render("productos/editarProducto", {
        usuario: req.session.usuario,
        errors: errors.mapped(),
        oldData: req.body,
      });
    }

    productosDB.actaulizarProducto(producto);
    res.redirect("/inicio");
  },
  eliminarProducto: function (req, res) {
    let id = req.params.id;
    productosDB.eliminarProducto(id);
    //let productos = productosDB.obtenerTodos();
    res.redirect("/inicio");
  },

  añadirProducto: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let productos = productosDB.obtenerTodos();
      let id = productosDB.obtenerUltimoId() + 1;
      let producto = {
        id: id,
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        colores: req.body.colores,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.file.filename,
      };
      productosDB.agregarProducto(producto);
      console.log(producto);
      res.redirect("/inicio");
    } else {
      res.render("productos/agregarProducto", {
        errors: errors.mapped(),
        oldData: req.body,
        usuario: req.session.usuario,
      });
    }
  },
};

module.exports = controlador;
