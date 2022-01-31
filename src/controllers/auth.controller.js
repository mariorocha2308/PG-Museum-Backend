const { User, Role, RefreshToken } = require("../db");
const {
  jwtExpiration,
  secret,
  jwtSecretReset,
} = require("../config/auth.config");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const validateRequest = require("../middleware/validate-request");
const Joi = require("joi");


const accountService = require("../services/auth.service");

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_ID); //<<<--- VER ¿???

const googleSignUp = async (req, res) => {

  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID, // ver¿?? 
  });
  const payload = ticket.getPayload();

  console.log(payload);
  // const userid = payload["sub"];
  const { name, email, picture } = payload;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {

    let authorities = [];
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
              id: user.id,
              username: user.email,
              email: user.email,
              roles: authorities,
            });
          });
  } else {
 
    await User.create({
      username: email,
      name: name,
      email: email,
      password: "",
      image: picture
    })
    .then(async(user) => {
     await user.setRoles(
        [1] 
      );
      return user;
    })
    .then(async(user) => {
      let authorities = [];
      await user.getRoles().then(roles => { 
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
      });
      res.send({
        //token: token,
        id:user.id,
        username: user.email,
        name: user.name,
        email: user.email,
        image: user.picture,
        roles: authorities
      });

    })
  }
};

const signup = (req, res) => {
  User.create({
    name: req.body.name,
    username: req.body.username,
    email:req.body.email,
    image: req.body.image,

    password: bcrypt.hashSync(req.body.password, 8),
 
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuario Registrado Exitosamente" });
          });
        });
      } else {
        user.setRoles(
          [1].then(() => {
            res.send({ message: "Usuario Registrado Exitosamente" });
          })
        );
      }
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no Encontrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Password Invalido!",
        });
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: jwtExpiration, // 24 hours
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          image: user.image,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const refreshToken = async (req, res) => {

  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).send({ message: '"Refrescar token es Requerido' });
  }
  try {

    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    console.log(refreshToken);

    if (!refreshToken) {
      res
        .status(403)
        .send({ message: "No se encuentra token en la base de Datos" });

      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Token ha Expirado inicie sesion nuevamente",
      });
      return;
    }

    const user = refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, secret, {
      expiresIn: jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};



function forgotPasswordSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
}

function forgotPassword(req, res, next) {
  accountService
    .forgotPassword(req.body, req.get("origin"))
    .then(() =>
      res.json({
        message: "Please check your email for password reset instructions",
      })
    )
    .catch(next);
}

function resetPasswordSchema(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  validateRequest(req, next, schema);
}

function resetPassword(req, res, next) {
  accountService
    .resetPassword(req.body)
    .then(() =>
      res.json({ message: "Password reset successful, you can now login" })
    )
    .catch(next);
}

module.exports = {
  signin,
  signup,
  googleSignUp,
  refreshToken,
  forgotPassword,
  forgotPasswordSchema,
  resetPasswordSchema,
  resetPassword,
};
