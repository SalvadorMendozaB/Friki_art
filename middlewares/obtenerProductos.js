const productosDB = require("../public/javascripts/productosDB");
const ProductExport = require("../database/models/Product");

const obtenerProductos = function (req,res,next) {
    //req.productos = productosDB.obtenerTodos();

    ProductExport.findAll().then(function (Productos) {
        req.productos = Productos;
        next();
    })
    .catch(ex => {
        console.log(ex);
    })

}

module.exports = obtenerProductos;