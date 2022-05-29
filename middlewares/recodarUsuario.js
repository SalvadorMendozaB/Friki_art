const usersDB = require("../public/javascripts/usersDB");
const db = require("../database/models/DefinirTodos");

const recordarUsuario = function (req,res,next) {

    if(req.cookies.usuario){
        db.User.findByPk(req.cookies.usuario)
        .then(usuario => {
            req.session.usuario = {
                id: usuario.user_id,
                nombre: usuario.username,
                imagen: usuario.image,
                categoria: usuario.user_category_name,
              };
        });
       
    }

    next();
}


module.exports = recordarUsuario;