const { User, user_Roles } = require("../db");

async function getUsersRoles(req, res, next) {
    try {
      const userRoles = await user_Roles.findAll();
      const users = await User.findAll();
      if (userRoles && users) {
        const usersRoles = users.map((user) => {
            const userRole = userRoles.find(
                (userRole) => userRole.userId === user.id
            );
            let role = "";	
            if (userRole.roleId === 1) {
                role = "ROLE_ADMIN";
            }
            if (userRole.roleId === 2) {
                role = "ROLE_BLOCKED";
            }
            if (userRole.roleId === 3) {
                role = "ROLE_USER";
            }
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            image: user.image,
            roles: role
          };
        });
        return res.status(200).send({ usersRoles });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los user and roles",
        error,
      });
    }
  }

  module.exports = {
    getUsersRoles,
  };