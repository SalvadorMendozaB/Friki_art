const usersDB = require("../public/javascripts/usersDB");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const controlador = {
  login: function (req, res, next) {
    res.render("users/login");
  },
  loguear: function (req, res, next) {
    let usuarios = usersDB.obtenerUsuarios();
    usuarios.forEach(usuario => {
      if (usuario.email == req.body.email && bcrypt.compareSync(req.body.password,usuario.password)){

        req.session.usuario = {id: usuario.id,nombre: usuario.nombre +" "+usuario.apellido,imagen: usuario.imagen, categoria: usuario.categoria};
        if(req.body.recordarme){
          res.cookie("usuario", usuario.id,{maxAge: 6000000});
        }
        res.redirect("/inicio");
        
      }
    });
    res.render("users/login",{errores: {msg: "Error de autenticacion, credenciales no validas"}, oldData: req.body});
  },
  logout: function (req,res,next) {
    req.session.usuario = undefined;
    res.clearCookie("usuario");
    res.redirect("/inicio");
  },
  registro: function (req, res, next) {
    usersDB.obtenerUltimoId();
    res.render("users/formatoRegistro");
  },
  registrarUsuario: function (req,res,next) {
    let usuario = {
      id: usersDB.obtenerUltimoId() + 1,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.contraseña,10),
      categoria: req.body.categoria,
      imagen: req.file.filename
    }

    console.log(req.body);

    usersDB.registrarUsuario(usuario);
    res.render("users/login");
  },

  detalleUsuario: function (req,res,next) {
    let usuario = usersDB.obtenerUsuario(req.params.id);

    res.render("users/perfil",{usuarioDetalle: usuario, usuario: req.session.usuario});
  },

  cargarVistaEditar: function (req,res,next) {
    let usuarioEditar = usersDB.obtenerUsuario(req.params.id);

    res.render("users/editarUsuario", {usuario: req.session.usuario, usuarioEditar: usuarioEditar});

  },
  editarUsuario: function (req,res){
   let usuario = usersDB.obtenerUsuario(req.params.id);
   usuario.nombre = req.body.nombre;
   usuario.apellido = req.body.apellido;
   usuario.email = req.body.email;
   usuario.categoria = req.body.categoria;
   if(req.file){
     usuario.imagen = req.file.filename;
   }
   req.session.usuario = { id: usuario.id,nombre: usuario.nombre+" "+usuario.apellido, imagen: usuario.imagen, categoria: usuario.categoria};

   usersDB.actualizarUsuario(usuario);
   res.redirect("/users/"+usuario.id);
  },
};
module.exports = controlador;
