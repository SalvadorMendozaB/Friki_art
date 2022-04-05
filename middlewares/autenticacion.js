const autenticacion = function (req,res,next) {
    if(req.session.usuario){
        next();
    }else{
        res.render("users/login",{errores: {msg: "Debes de iniciar sesion para entrar a este sitio"}});
    }
}

module.exports = autenticacion;