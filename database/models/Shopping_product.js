const Sequelize = require("sequelize");
const sequelize = require("../sequelizeDb");

    const cols = {
        product_id: {
            type: Sequelize.INTEGER
        },
        shopping_car_id: {
            type: Sequelize.INTEGER,
        },        
        amount: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DOUBLE
        }

    }

    const config = {

        tableName: "shopping_product",
        timestamps: false
    }


    const ShoppingProduct= sequelize.define("Shopping_product", cols, config);

    module.exports = ShoppingProduct;