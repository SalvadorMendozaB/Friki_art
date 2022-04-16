const Sequelize = require("sequelize");
const sequelize = require("../sequelizeDb");

    const cols = {
        category_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(100)
        }

    }

    const config = {

        tableName: "category",
        timestamps: false
    }


    const Category= sequelize.define("Category", cols, config);

    Category.associate = function(modelos) {
        Category.hasMany(modelos.Product, {
            as: "category",
            foreignKey: "category"
        })
    }

    module.exports = Category;
