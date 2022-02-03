const { Router } = require('express');
const router = Router();
const artworkRoutes = require('./artworks');
const typesRoutes = require('./types_of_art');
const usersRoutes = require('./users');
const shoppingCartRoutes = require('./shopping_cart');
const galleryRoutes = require('./gallery');
const reviewRoutes = require('./review');
const ratingRoutes = require('./rating');
const purchaseOrderRoutes = require('./purchase_order');
const processPaymentRoutes = require('./process_payment');
const { getUsersRoles } = require('../controllers/roles');
const { verifySignUp, authJwt } = require('../middleware');
const {
  signup,
  signin,
  googleSignUp,
  refreshToken,
  forgotPassword,
  forgotPasswordSchema,
  resetPasswordSchema,
  resetPassword,

  resetPasswordRequestController,
  resetPasswordController
} = require("../controllers/auth.controller");

const { searchUser, deleteUser } = require("../controllers/users");
const {
  allAccess,
  userBoard,
  adminBoard,
} = require("../controllers/user.controller");

router.post(
  "/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signup
);

router.post("/auth/signup/google", googleSignUp);
router.delete('/delete/google/:id', deleteUser);

router.post("/auth/signin", signin);


//olvido de password
router.post('/forgot-password',forgotPassword,  forgotPasswordSchema);

//Crear nuevo password
router.post('/reset-password', resetPassword,resetPasswordSchema );

/* router.post("/auth/requestResetPassword", resetPasswordRequestController);
router.post("/auth/resetPassword", resetPasswordController); */


router.get("/users/search", searchUser);


router.get("/auth/all", allAccess);
router.get("/auth/user", [authJwt.verifyToken], userBoard);


router.get(
  "/dashboard/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
);

router.post("/auth/refreshToken", refreshToken);
router.use("/user", usersRoutes);

//* RUTA ENCARGADA DE LAS OBRAS DE ARTE
router.use('/artwork', artworkRoutes);

//* RUTA ENCARGADA DE LOS TIPOS QUE SE GUARDAN EN LAS OBRAS
router.use('/types', typesRoutes);

//* RUTA PARA LAS RESEÑAS DENTRO DE LAS OBRAS DE ARTE POSTEA POR UN USUARIO
router.use('/review', reviewRoutes);
router.use('/gallery', galleryRoutes);
router.use('/shopping', shoppingCartRoutes)
router.use('/rating', ratingRoutes);
router.use('/order', purchaseOrderRoutes);
router.use('/payment', processPaymentRoutes);

router.get('/roles', getUsersRoles);


router.get('/', (req, res) => {
  res.status(200).send(' > > > > ||| . . . GO TO -/|\-/|\- HEROKU deploy . . . ||| > > >');

});

module.exports = router;
