const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { User, Role } = require('../db');
const { TokenExpiredError } = jwt;
const { OAuth2Client }  = require("google-auth-library");
const dotenv = require('dotenv');

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_ID);

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "No Autorizado token expirado!" });
  }

  return res.sendStatus(401).send({ message: "No Autorizado!" });
}


const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No se Recibio Token!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No Autorizado!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require ser Administrador!"
      });
      return;
    });
  });
};

const isUser  = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requiere ser usuario!"
      });
    });
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isUser,

}