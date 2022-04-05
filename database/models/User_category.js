const Sequelize = require("sequelize");
const sequelize = require("../sequelizeDb");

    const cols = {
        user_category_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(100)
        }

    }

    const config = {

        tableName: "user_category",
        timestamps: false
    }


    const UserCategory= sequelize.define("User_category", cols, config);

    UserCategory.associate = function(modelos) {
        UserCategory.hasMany(modelos.User, {
            as: "user_category",
            foreignKey: "user_category"
        })

    }

module.exports = UserCategory;