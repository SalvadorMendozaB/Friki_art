const Sequelize = require("sequelize");
const sequelize = require("../sequelizeDb");

    const cols = {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING(50)
        },
        name: {
            type: Sequelize.STRING(100)
        },
        last_name: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(150)
        },
        password : {
            type: Sequelize.STRING(100)
        },
        user_category: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING(300)
        },
    }

    const config = {

        tableName: "user",
        timestamps: false
    }


    const User= sequelize.define("User", cols, config);

    User.associate = function (modelos) {

        User.hasMany(modelos.Shopping_car,{
            as: "user",
            foreignKey: "user_id"
        })
        
        User.belongsTo(modelos.User_category,{
            as: "user_category",
            foreignKey: "user_category"
        })

    }

module.exports = User;