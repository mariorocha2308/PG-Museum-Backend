const { Router } = require('express');

const artworkRoutes = require('./artworks');
const typesRoutes = require('./types_of_art');
const usersRoutes = require('./users');
const shoppingCartRoutes = require('./shopping_cart');
const galleryRoutes = require('./gallery');

const adminRoutes = require("./admin");

const reviewRoutes = require('./review');


const { verifySignUp,authJwt} = require('../middleware');

const router = Router();

const { signup, signin, googleSignUp,refreshToken, } = require("../controllers/auth.controller");

router.post(
  "/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signup
);

router.post("/auth/signup/google", googleSignUp);

router.post("/auth/signin", signin);


const {
  allAccess,
  userBoard,
  adminBoard,
} = require("../controllers/user.controller");

router.get("/auth/all", allAccess);

router.get("/auth/user", [authJwt.verifyToken], userBoard);


router.get(
  "/dashboard/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
);


router.post("/auth/refreshToken", refreshToken);
/////////////////////////////////////////////
router.use("/users", [authJwt.verifyToken, authJwt.isUser], usersRoutes);
router.use("/admin", [authJwt.verifyToken, authJwt.isAdmin], adminRoutes);
router.use('/home', artworkRoutes);
router.use('/types', typesRoutes);
router.use('/review', reviewRoutes);
router.use('/gallery', galleryRoutes);
router.use('/shopping', shoppingCartRoutes)
router.get('/', (req, res) => {
    res.status(200).send(' > > > > ||| . . . GO TO -/|\-/|\- HEROKU deploy . . . ||| > > >');

});

module.exports = router;
