let productosDB = require("../public/javascripts/productosDB.js");
const db = require("../database/models/DefinirTodos");
const { validationResult } = require("express-validator");
const sequelize = require("../database/sequelizeDb");
const { QueryTypes } = require("sequelize");

const controlador = {
  detalleProducto: function (req, res) {
    sequelize
      .query(
        `SELECT product_id, product.name, category, category.name as category_name , brand, description, price, image from product 
                  INNER JOIN category ON product.category = category.category_id
                  WHERE product_id = ` + req.params.id,
        { type: QueryTypes.SELECT }
      )
      .then((producto, metadata) => {
        console.log(producto);
        res.render("productos/detalleProducto", {
          producto: producto[0],
          usuario: req.session.usuario,
        });
      })
      .catch((ex) => {});
  },

  carritoCompra: function (req, res) {
    res.render("productos/carritoCompra", { usuario: req.session.usuario });

    res.render("carritoCompra");
  },

  cargarVistaCrear: function (req, res) {
    db.Category.findAll().then((categorias) => {
      res.render("productos/agregarProducto", {
        categorias: categorias,
        usuario: req.session.usuario,
      });
    });
  }, 

  cargarVistaEditar: function (req, res) {
    let promesaProducto = db.Product.findByPk(req.params.id);
    let promesaCategorias = db.Category.findAll();

    Promise.all([promesaProducto, promesaCategorias]).then(
      ([producto, categorias]) => {
        res.render("productos/editarProducto", {
          categorias: categorias,
          producto: producto,
          usuario: req.session.usuario,
        });
      }
    );
  },

  actualizarProducto: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {

      let productoAModificar = {
        name: req.body.nombre,
        category: req.body.categoria,
        //producto.colores = req.body.colores;
        description: req.body.descripcion,
        price: req.body.precio,
      };

      if (req.file) {
        productoAModificar.image = req.file.filename;
      }

      db.Product.update(
         productoAModificar ,
        { where: { product_id: req.params.id } }
      ).then((result) => {
        console.log("actualizado con exito");
        res.redirect("/inicio");
      });

    } else {
      req.body.id = req.params.id;
      db.Category.findAll().then((categorias) => {
        res.render("productos/editarProducto", {
          categorias: categorias,
          usuario: req.session.usuario,
          errors: errors.mapped(),
          oldData: req.body,
        });
      });
    }
  },

  eliminarProducto: function (req, res) {
    db.Product.destroy({ where: { product_id: req.params.id } }).then(
      (result) => {
        console.log("Eliminado con exito");
        res.redirect("/inicio");
      }
    );
  },

  añadirProducto: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let producto = {
        name: req.body.nombre,
        category: req.body.categoria,
        //colors: req.body.colores,
        description: req.body.descripcion,
        price: req.body.precio,
        image: req.file.filename,
      };

      db.Product.create(producto).then((result) => {
        res.redirect("/inicio");
      });
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
