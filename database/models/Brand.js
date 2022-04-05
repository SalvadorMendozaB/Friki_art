
const Sequelize = require("sequelize");
const sequelize = require("../sequelizeDb");

    const cols = {
        brand_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(100)
        }

    }

    const config = {

        tableName: "brand",
        timestamps: false
    }


    const Brand= sequelize.define("Brand", cols, config);

    Brand.associate = function(modelos) {

        Brand.hasMany(modelos.Product, {
            as: "brands",
            foreignKey: "brand"
        })
    }

module.exports = Brand;
