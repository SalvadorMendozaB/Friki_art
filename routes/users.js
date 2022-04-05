var express = require('express');
var router = express.Router();
const path = require("path");
let usersController = require('../controllers/usersController');
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, "./public/images/users");
    },
    filename: function (req,file,cb) {
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname));
    }
});

const uploadFile = multer({storage});


/* GET users listing. */
router.get('/login', usersController.login);

router.post('/login', usersController.loguear);

router.get('/formatoRegistro', usersController.registro);

router.post("/registrar",uploadFile.single("imagen"),usersController.registrarUsuario);

router.get("/logout", usersController.logout);

router.get("/editar/:id", usersController.cargarVistaEditar); 

router.put("/:id",uploadFile.single("imagen") , usersController.editarUsuario); 



router.get("/:id", usersController.detalleUsuario);

module.exports = router;
