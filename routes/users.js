var express = require("express");
var router = express.Router();
const path = require("path");
let usersController = require("../controllers/usersController");
const multer = require("multer");
const { check } = require("express-validator");
const db = require("../database/models/DefinirTodos");
const bcrypt = require("bcryptjs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/users");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadFile = multer({ storage });

const validacionesRegistro = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .bail()
    .isLength({ min: 2, max: undefined })
    .withMessage("El nombre debe de tener minimo 2 caracteres")
    .bail(),
  check("apellido")
    .notEmpty()
    .withMessage("El apellido no debe estar vacio")
    .bail()
    .isLength({ min: 2, max: undefined })
    .withMessage("El apellido debe de tener minimo 2 caracteres")
    .bail(),
  check("nombre_usuario")
    .notEmpty()
    .withMessage("El apellido no debe estar vacio")
    .bail()
    .isLength({ min: 2, max: undefined })
    .withMessage("El apellido debe de tener minimo 2 caracteres")
    .bail()
    .custom((value, { req }) => {
      return db.User.findAll({
        where: {
          username: value,
        },
      }).then((usuarios) => {
        if (usuarios.length > 0) {
          throw new Error("");
        } else {
          return true;
        }
      });
    })
    .withMessage("Este nombre de usuario ya esta ocupado"),
  check("email")
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .bail()
    .isEmail()
    .withMessage("Introduzca un email valido")
    .bail()
    .custom((value, { req }) => {
      return db.User.findAll({
        where: {
          email: value,
        },
      })
        .then((usuarios) => {
          if (usuarios.length > 0) {
            throw new Error("Errores monos");
          } else {
            return true;
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    })
    .withMessage("Este email ya ha sido registrado anteriormente"),
  check("contraseña")
    .notEmpty()
    .withMessage("La contraseña no debe de estar vacia")
    .bail()
    .isLength({ min: 8, max: undefined })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  check("confirmarPass")
    .custom((value, { req }) => {
      if (value == req.body.contraseña) {
        return true;
      } else {
        throw new Error("");
      }
    })
    .withMessage("Ambas contraseñas deben de coincidir"),
  check("categoria")
    .custom((value, { req }) => {
      if (value == "undefined") {
        throw new Error("");
      } else {
        return true;
      }
    })
    .withMessage("Debes de seleccionar una categoria"),
  check("imagen")
    .custom((value, { req }) => {
      let extensionesValidas = [".jpg", ".png", ".jpeg"];
      if (!req.file) {
        throw new Error("Debes de subir una imagen");
      } else {
        if (extensionesValidas.includes(path.extname(req.file.originalname))) {
          return true;
        } else {
          throw new Error(
            "Extension de archivo no valida, extensiones pemritidas: .jpg, " +
              ".png, " +
              ".jpeg"
          );
        }
      }
    })
    .withMessage(
      "Extension de archivo no valida, extensiones pemritidas: .jpg, " +
        ".png, " +
        ".jpeg"
    ),
];

const validacionesEdicion = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .bail()
    .isLength({ min: 2, max: undefined })
    .withMessage("El nombre debe de tener minimo 2 caracteres")
    .bail(),
  check("apellido")
    .notEmpty()
    .withMessage("El apellido no debe estar vacio")
    .bail()
    .isLength({ min: 2, max: undefined })
    .withMessage("El apellido debe de tener minimo 2 caracteres")
    .bail(),
  check("nombre_usuario")
    .notEmpty()
    .withMessage("El apellido no debe estar vacio")
    .bail()
    .isLength({ min: 2, max: undefined })
    .withMessage("El nombre de usuario debe de tener minimo 2 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .bail()
    .isEmail()
    .withMessage("Introduzca un email valido"),
  check("contraseña")
    .notEmpty()
    .optional({ nullable: true, checkFalsy: true })
    .withMessage("La contraseña no debe de estar vacia")
    .bail()
    .isLength({ min: 8, max: undefined })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  check("confirmarPass")
    .custom((value, { req }) => {
      if (value == req.body.contraseña) {
        return true;
      } else {
        throw new Error("");
      }
    })
    .optional({ nullable: true, checkFalsy: true })
    .withMessage("Ambas contraseñas deben de coincidir"),
  check("categoria")
    .custom((value, { req }) => {
      if (value == "undefined") {
        throw new Error("");
      } else {
        return true;
      }
    })
    .withMessage("Debes de seleccionar una categoria"),
  check("imagen")
    .custom((value, { req }) => {
      let extensionesValidas = [".jpg", ".png", ".jpeg"];
      if (!req.file) {
        throw new Error("Debes de subir una imagen");
      } else {
        if (extensionesValidas.includes(path.extname(req.file.originalname))) {
          return true;
        } else {
          throw new Error(
            "Extension de archivo no valida, extensiones pemritidas: .jpg, " +
              ".png, " +
              ".jpeg"
          );
        }
      }
    })
    .optional({ nullable: true, checkFalsy: true })
    .withMessage(
      "Extension de archivo no valida, extensiones pemritidas: .jpg, " +
        ".png, " +
        ".jpeg"
    ),
];

const validacionesPassword = [
  check("password_actual").custom((value, { req }) => {
    return db.User.findByPk(req.params.id).then((usuario) => {
      if (bcrypt.compareSync(req.body.password_actual, usuario.password)) {
        return true;
      } else {
        throw new Error("");
      }
    });
  })
  .withMessage("La contraseña no coincide con la contraseña que esta usando actualmente"),
  check("nueva_password")
    .notEmpty()
    .withMessage("La contraseña no debe de estar vacia")
    .bail()
    .isLength({ min: 8, max: undefined })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  check("confirmarPass")
    .custom((value, { req }) => {
      if (value == req.body.nueva_password) {
        return true;
      } else {
        throw new Error("");
      }
    })
    .withMessage("Ambas contraseñas deben de coincidir"),
];

/* GET users listing. */
router.get("/login", usersController.login);

router.post("/login", usersController.loguear);

router.get("/formatoRegistro", usersController.registro);

router.post(
  "/registrar",
  uploadFile.single("imagen"),
  validacionesRegistro,
  usersController.registrarUsuario
);

router.get("/logout", usersController.logout);

router.get("/editar/:id", usersController.cargarVistaEditar);

router.get("/editarPassword/:id", usersController.cargarEditarPassword);

router.put("/editarPassword/:id",validacionesPassword, usersController.editarPassword);

router.put(
  "/:id",
  uploadFile.single("imagen"),
  validacionesEdicion,
  usersController.editarUsuario
);

router.get("/:id", usersController.detalleUsuario);

router.delete("/:id", usersController.eliminarUsuario);

module.exports = router;
