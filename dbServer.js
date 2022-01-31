const bcrypt = require("bcryptjs");
const { Role, User, Rating } = require('./src/db');


async function ratingInitial() {
  try {
    const rating = await Rating.findAll();
    if (rating.length === 0) {
      const ratingData = await Rating.create({rating: "0",});
      const ratingData1 = await Rating.create({rating: "1"});
      const ratingData2 = await Rating.create({rating: "2"});
      const ratingData3 = await Rating.create({rating: "3"});
      const ratingData4 = await Rating.create({rating: "4"});
      const ratingData5 = await Rating.create({rating: "5"});
    } else {
      console.log("rating ya existe");
    }
  } catch (err) {
    console.log(err);
  }
}
 
  async function defaultAdminAndRoles() {
    try {
      ///////////////////////////////////////ROLES
      const roldb = await Role.findAll();
      if (roldb.length === 0) {
        const rolUser = await Role.create({
          id: 1,
          name: "user"
        });
        const rolDeleteBlocked = await Role.create({
          id: 2,
          name: "user delete and blocked"
        });
        const rolAdmin = await Role.create({
          id: 3,
          name: "admin"
        });
      } else {
        console.log("Roles ya existen");
      }
      ///////////////////////////////////////////ADMIN DEFAULT
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


  module.exports = {
    ratingInitial,
    defaultAdminAndRoles
    }