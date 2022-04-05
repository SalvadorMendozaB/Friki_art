const Sequelize = require("sequelize");
const sequelize = require("../sequelizeDb");

    const cols = {
        product_id: {
            type: Sequelize.INTEGER
        },
        color_id: {
            type: Sequelize.INTEGER
        }

    }

    const config = {

        tableName: "product_color",
        timestamps: false
    }


    const ProductColor= sequelize.define("Product_color", cols, config);

module.exports = ProductColor;