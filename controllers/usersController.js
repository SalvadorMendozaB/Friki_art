const usersDB = require("../public/javascripts/usersDB");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const sequelize = require("../database/sequelizeDb");
const db = require("../database/models/DefinirTodos");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const controlador = {
  login: function (req, res, next) {
    res.render("users/login");
  },
  loguear: function (req, res, next) {
    sequelize
      .query(
        `SELECT user_id, username,email,password, image, user_category,user_category.name AS user_category_name
            FROM user INNER JOIN user_category ON user.user_category = user_category_id`
      )
      .then((usuarios) => {
        usuarios[0].forEach((usuario) => {
          if (
            usuario.email == req.body.email &&
            bcrypt.compareSync(req.body.password, usuario.password)
          ) {
            req.session.usuario = {
              id: usuario.user_id,
              nombre: usuario.username,
              imagen: usuario.image,
              categoria: usuario.user_category_name,
            };
            if (req.body.recordarme) {
              res.cookie("usuario", usuario.id, { maxAge: 6000000 });
            }
            res.redirect("/inicio");
          }
        });
        res.render("users/login", {
          errores: { msg: "Error de autenticacion, credenciales no validas" },
          oldData: req.body,
        });
      });
  },
  logout: function (req, res, next) {
    req.session.usuario = undefined;
    res.clearCookie("usuario");
    res.redirect("/inicio");
  },
  registro: function (req, res, next) {
    db.User_category.findAll().then((categorias) => {
      res.render("users/formatoRegistro", { categorias: categorias });
    });
  },
  registrarUsuario: function (req, res, next) {
    let errores = validationResult(req);
    if (errores.isEmpty()) {
      let usuario = {
        username: req.body.nombre_usuario,
        name: req.body.nombre,
        last_name: req.body.apellido,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.contraseña, 10),
        user_category: req.body.categoria,
        image: req.file.filename,
      };

      db.User.create(usuario)
        .then((result) => {
          res.render("users/login");
        })
        .catch((ex) => {
          console.log(ex);
        });
    } else {
      console.log(errores);

      db.User_category.findAll().then((categorias) => {
        res.render("users/formatoRegistro", {
          categorias: categorias,
          oldData: req.body,
          errors: errores.mapped(),
        });
      });
    }
  },

  detalleUsuario: function (req, res, next) {
    sequelize
      .query(
        `SELECT user_id, username, user.name, last_name, email, password, image, user_category, user_category.name AS user_category_name
          FROM user INNER JOIN user_category ON user.user_category = user_category_id
          WHERE user_id = '` +
          req.params.id +
          `'`
      )
      .then((usuario) => {
        res.render("users/perfil", {
          usuarioDetalle: usuario[0][0],
          usuario: req.session.usuario,
        });
      })
      .catch((ex) => {
        console.log(ex);
      });
  },

  cargarVistaEditar: function (req, res, next) {
    let promesaUsuario = sequelize.query(
      `SELECT user_id, username, user.name, last_name, email, password, image, user_category, user_category.name AS user_category_name
          FROM user INNER JOIN user_category ON user.user_category = user_category_id
          WHERE user_id = '` +
        req.params.id +
        `'`
    );
    let promesaCategorias = db.User_category.findAll();

    Promise.all([promesaUsuario, promesaCategorias])
      .then(([usuarioEditar, categorias]) => {
        res.render("users/editarUsuario", {
          usuario: req.session.usuario,
          usuarioEditar: usuarioEditar[0][0],
          categorias: categorias,
        });
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
  editarUsuario: function (req, res) {
    let errores = validationResult(req);

    let usuario = {
      user_id: req.params.id,
      name: req.body.nombre,
      last_name: req.body.apellido,
      username: req.body.nombre_usuario,
      email: req.body.email,
      user_category: req.body.categoria,
    };

    if (errores.isEmpty()) {
      if (req.file) {
        usuario.image = req.file.filename;
      }

      db.User.update(usuario, { where: { user_id: req.params.id } })
        .then((result) => {})
        .catch((ex) => {
          console.log(ex);
        });

      req.session.usuario = {
        id: usuario.user_id,
        nombre: usuario.username,
        imagen: usuario.image,
        categoria: usuario.user_category_name,
      };
      res.redirect("/users/" + usuario.user_id);
    } else {
      db.User_category.findAll().then((categorias) => {
        res.render("users/editarUsuario", {
          categorias: categorias,
          oldData: req.body,
          errors: errores.mapped(),
          usuarioEditar: usuario,
        });
      });
    }
  },

  cargarEditarPassword: (req, res) => {
    res.render("users/editarPassword", {
      usuario: req.session.usuario,
    });
  },

  editarPassword: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findByPk(req.params.id)
        .then((usuario) => {
            db.User.update(
              { password: bcrypt.hashSync(req.body.nueva_password, 10) },
              { where: { user_id: usuario.user_id } }
            )
              .then((response) => {
                res.redirect("/users/" + req.params.id);
              })
              .catch((ex) => {
                console.log(ex);
              });
        })
        .catch((ex) => {
          console.log(ex);
        });
    }else {
      console.log(errors.mapped());
    }
  },

  eliminarUsuario: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((usuario) => {
        fs.unlinkSync(path.resolve("public/images/users/" + usuario.image));
        db.User.destroy({ where: { user_id: req.params.id } })
          .then((result) => {
            console.log("Eliminado con exito");
            req.session.usuario = undefined;
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
};
module.exports = controlador;
