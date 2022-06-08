const sequelize = require("../../../database/sequelizeDb");

const controller = {
  busquedaNombreUsuario: (req, res, next) => {
    sequelize
      .query(
        `SELECT user_id, username, user.name, last_name, email, password, image, user_category, user_category.name AS user_category_name
          FROM user INNER JOIN user_category ON user.user_category = user_category_id
          WHERE username = '` +
          req.params.username +
          `'`
      )
      .then((usuario) => {
        if (usuario[0][0] != undefined) {
          return res.json(usuario[0][0]);
        } else {
            return {notFound: true};
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
};

module.exports = controller;
