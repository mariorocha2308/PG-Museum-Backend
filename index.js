//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getTypes } = require('./src/controllers/types_of_art');
const { getApiToDb } = require('./src/controllers/artworks');
const bcrypt = require("bcryptjs");

const { Role, User } = require('./src/db');

const port = process.env.PORT || 5040;

async function defaultAdmin() {
  try {
    const userdb = await User.findOne({
      where: {
        id: 1
      }
    })
    if (!userdb) {
      const user = await User.create({
        name: "Admin",
        username: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("12345", 8),
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Steve_Jobs_in_1972_Pegasus_%28retouched%29.jpg/340px-Steve_Jobs_in_1972_Pegasus_%28retouched%29.jpg"
      });
      await user.addRoles(3);
    } else {
      console.log("Admin ya existe");
    }
  } catch (error) {
    console.log(error);
  }
}


async function initial() {
  try {
    const roldb = await Role.findAll();
    if (roldb.length === 0) {
      const rolUser = await Role.create({
        id: 1,
        name: "user"
      });
      const rolAdmin = await Role.create({
        id: 3,
        name: "admin"
      });
    } else {
      console.log("Roles ya existen");
    }
  } catch (error) {
    console.log(error);
  }
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log('o|O_O|o robot Σωκράτης listening at 5040');
    // eslint-disable-line no-console
    getTypes();
    initial()
    defaultAdmin();
  });
  getApiToDb();
});
