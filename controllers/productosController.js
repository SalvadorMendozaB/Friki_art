let productosDB = require("../public/javascripts/productosDB.js");
const db = require("../database/models/DefinirTodos");
const { validationResult } = require("express-validator");
const sequelize = require("../database/sequelizeDb");
const { QueryTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

const controlador = {
  detalleProducto: function (req, res) {
    sequelize
      .query(
        `SELECT product_id, product.name, category, category.name as category_name , brand,brand.name AS brand_name, description, price, image from product 
                  INNER JOIN category ON product.category = category.category_id
                  INNER JOIN brand ON product.brand = brand.brand_id
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
      .catch((ex) => {
        console.log(ex);
      });
  },

  carritoCompra: function (req, res) {
    res.render("productos/carritoCompra", { usuario: req.session.usuario });

    res.render("carritoCompra");
  },

  cargarVistaCrear: function (req, res) {
    let promesaBrands = db.Brand.findAll();
    let promesaCategorias = db.Category.findAll();
    
    Promise.all([promesaBrands,promesaCategorias])
    .then(([resultadoBrands, resultadoCategorias]) => {
      res.render("productos/agregarProducto", {
        marcas: resultadoBrands,
        categorias: resultadoCategorias,
        usuario: req.session.usuario,
      });
    });
  },

  cargarVistaEditar: function (req, res) {
    let promesaProducto = sequelize
    .query(
      `SELECT product_id, product.name, category, category.name as category_name , brand,brand.name AS brand_name, description, price, image from product 
                INNER JOIN category ON product.category = category.category_id
                INNER JOIN brand ON product.brand = brand.brand_id
                WHERE product_id = ` + req.params.id,
      { type: QueryTypes.SELECT }
    );
    let promesaCategorias = db.Category.findAll();
    let promesaBrands = db.Brand.findAll();

    Promise.all([promesaProducto, promesaCategorias,promesaBrands]).then(
      ([producto, categorias, marcas]) => {
        res.render("productos/editarProducto", {
          marcas: marcas,
          categorias: categorias,
          producto: producto[0],
          usuario: req.session.usuario,
        });
      }
    )
    .catch(ex => {
      console.log(ex);
    })
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

      db.Product.update(productoAModificar, {
        where: { product_id: req.params.id },
      }).then((result) => {
        console.log("actualizado con exito");
        res.redirect("/inicio");
      });
    } else {
      req.body.id = req.params.id;
      let promesaCategorias =  db.Category.findAll();
      let promesaBrands = db.Brand.findAll();

      Promise.all([promesaCategorias,promesaBrands])
     .then(([categorias, marcas]) => {
        res.render("productos/editarProducto", {
          categorias: categorias,
          marcas: marcas,
          usuario: req.session.usuario,
          errors: errors.mapped(),
          oldData: req.body,
        });
      });
    }
  },

  eliminarProducto: function (req, res) {
    db.Product.findByPk(req.params.id)
      .then((producto) => {

        fs.unlinkSync(path.resolve("public/images/productos/"+producto.image));
        db.Product.destroy({ where: { product_id: req.params.id } })
          .then((result) => {
            console.log("Eliminado con exito");
            res.redirect("/inicio");
          })
          .catch((ex) => {
            console.log(ex);
          });
      })
      .catch((ex) => {
        console.log(ex);
      });
  },

  añadirProducto: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let producto = {
        name: req.body.nombre,
        category: req.body.categoria,
        //colors: req.body.colores,
        description: req.body.descripcion,
        brand: req.body.marca,
        price: req.body.precio,
        image: req.file.filename,
      };

      db.Product.create(producto).then((result) => {
        res.redirect("/inicio");
      });
    } else {
      req.body.id = req.params.id;
      let promesaCategorias =  db.Category.findAll();
      let promesaBrands = db.Brand.findAll();

      Promise.all([promesaCategorias , promesaBrands])
     .then(([categorias , marcas]) => {
        res.render("productos/agregarProducto", {
          categorias: categorias,
          marcas: marcas,
          usuario: req.session.usuario,
          errors: errors.mapped(),
          oldData: req.body,
        });
      });
    }
  },
};

module.exports = controlador;
