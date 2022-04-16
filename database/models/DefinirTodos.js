const Brand = require("./Brand.js");
const Category = require("./Category.js");
const Color = require("./Color.js");
const Product_color = require("./Product_color.js");
const Product = require("./Product.js");
const Shopping_car = require("./Shopping_car.js");
const Shopping_product = require("./Shopping_product.js");
const User_category = require("./User_category.js");
const User = require("./User.js");

const db = {
    Brand: Brand,
    Category: Category,
    Color: Color,
    Product_color: Product_color,
    Product: Product,
    Shopping_car: Shopping_car,
    Shopping_product: Shopping_product,
    User_category: User_category,
    User: User 
}

for(let i in db){
   if(i.associate){
       db[i.name].associate(db);
   }
}

module.exports = db;