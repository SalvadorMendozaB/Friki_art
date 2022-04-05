const usersDB = require("../public/javascripts/usersDB");

const recordarUsuario = function (req,res,next) {

console.log("Cookies = " + req.cookies.usuario);
    if(req.cookies.usuario){
        let usuario = usersDB.obtenerUsuario(req.cookies.usuario);
        req.session.usuario = { id: usuario.id,nombre: usuario.nombre+" "+usuario.apellido, imagen: usuario.imagen, categoria: usuario.categoria};
    }

    next();
}


module.exports = recordarUsuario;