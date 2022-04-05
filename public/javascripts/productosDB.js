const fs = require("fs");
const path = require("path");

const productosDB = {
    obtenerTodos: function () {
        let productos = this.leerJSON();
        let arregloProductos = JSON.parse(productos);
        return arregloProductos;
    },
    obtenerUltimoId: function (){
        let productos = this.obtenerTodos();
        let ids = productos.map((producto) => {
            return producto.id; 
        });

        ids.sort(function (a,b) { return a-b});
        return ids[ids.length-1];
    },
    agregarProducto: function (producto) {
        let productos = this.obtenerTodos();
        productos.push(producto);
        let productosString = JSON.stringify(productos);
        let ruta = path.resolve("data/productos.json");
        fs.writeFileSync(ruta,productosString);
    },
    obtenerProducto: function (id) {
        let productos = this.obtenerTodos();
        let producto = productos.filter((producto) => {
            return producto.id == id;
        })

        return producto[0];
    },
    actaulizarProducto: function (producto) {
        let productos = this.obtenerTodos();
        let id = producto.id;
        productos = productos.filter((producto) => {
            return producto.id != id;
        })
        productos.push(producto);
        let productosString = JSON.stringify(productos);
        let ruta = path.resolve("data/productos.json");
        fs.writeFileSync(ruta,productosString);


    },
    eliminarProducto: function (id) {
        let productos = this.obtenerTodos();
        productos = productos.filter((producto) => {
            return producto.id != id;
        })
        let productosString = JSON.stringify(productos);
        let ruta = path.resolve("data/productos.json");
        fs.writeFileSync(ruta,productosString);
        

    },
    leerJSON: function () {
        let ruta = path.resolve("data/productos.json");
        let productos = fs.readFileSync(ruta,"utf-8");
        return productos;
    }
}

module.exports = productosDB;