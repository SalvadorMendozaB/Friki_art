const Sequelize = require("sequelize");
const sequelize = require("../sequelizeDb");


    const cols = {
        product_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(100)
        },
        category: {
            type: Sequelize.INTEGER
        },
        brand: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING(500)
        },
        price:{
            type: Sequelize.DOUBLE
        },
        image: {
            type: Sequelize.STRING(300)
        }
    }

    const config = {

        tableName: "product",
        timestamps: false
    }


    const Product = sequelize.define("Product", cols, config);

    Product.associate = function(modelos) {

        Product.belongsTo(modelos.Category, {
            as: "categories",
            foreignKey: "category"
        });

        Product.belongsTo(modelos.Brand, {
            as: "brands",
            foreignKey: "brand"
        });

        Product.belongsToMany(modelos.Color, {
            as: "colors",
            through: "product_color",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: false
        });

        Product.belongsToMany(modelos.Shoping_car, {
            as: "shopping_products",
            through: "shopping_product",
            foreignKey: "product_id",
            otherKey: "shopping_id",
            timestamps: false
        });
    }

    module.exports = Product;

