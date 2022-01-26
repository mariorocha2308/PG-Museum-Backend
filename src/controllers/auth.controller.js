const { User, Role, RefreshToken } = require("../db");
const {jwtExpiration,secret}= require("../config/auth.config");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { Oauth2Client } = require("google-auth-library");
const dotenv = require('dotenv');



dotenv.config();
// const client = new Oauth2Client(process.env.REACT_APP_GOOGLE_ID); <<<--- VER ¿???
// Oauth2Client is not a constructor
const googleSignUp = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GLOOGLE_ID, // ver¿??
  });
  const payload = ticket.getPayload();
  // const userid = payload["sub"];
  const { name, email } = payload;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400,
    });
    res.send({
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    const newUser = await User.create({
      name: name,
      email: email,
      password: "",
    });
    newUser.setRoles([1]);
    const token = jwt.sign({ id: newUser.id }, secret, {
      expiresIn: 86400,
    });
    res.send({
      token: token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  }
};



const signup = (req, res) => {
  User.create({
    name: req.body.name,
    username: req.body.username,
    email:req.body.email,
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
    .then(async(user) => {
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
        expiresIn:jwtExpiration // 24 hours 
      });

      let refreshToken = await RefreshToken.createToken(user);


     let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
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


  const {refreshToken: requestToken} = req.body;
  
  if(requestToken == null){
  
    return res.status(403).send({message:'"Refrescar token es Requerido'})
  
  }try{
  
    let refreshToken = await RefreshToken.findOne({
  
      where:{token:requestToken}
      
    })
  
    console.log(refreshToken);
  
    if(!refreshToken){
  res.status(403).send({message:'No se encuentra token en la base de Datos'})
  
  return
  
  
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
      expiresIn:jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token
    });
  
  }catch(err){
  
    return res.status(500).send({ message: err });
  }
}

module.exports = {
    signin,
    signup,
    googleSignUp,
    refreshToken
}