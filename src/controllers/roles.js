const { User, user_Roles } = require("../db");

async function getUsersRoles(req, res, next) {
    try {
      const userRoles = await user_Roles.findAll();
      const users = await User.findAll();
    //   console.log("userRoles is ", userRoles);
    //   console.log("users is ", users);
      if (userRoles && users) {
        const usersRoles = users.map((user) => {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            image: user.image,
            roles: userRoles.filter((role) => role.userId === user.id),
          };
        });
        return res.status(200).send({ usersRoles });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los roles",
        error,
      });
    }
  }

  module.exports = {
    getUsersRoles,
  };