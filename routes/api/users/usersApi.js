var express = require("express");
var router = express.Router();
const usersApiController = require("../../../controllers/api/users/usersApiController");


router.get("/:username", usersApiController.busquedaNombreUsuario);


module.exports = router;