const { Router } = require("express");
const router = Router();
const {  putUser, deleteUser } = require("../controllers/users");

router.put('/update/account/:id', putUser);
router.delete('/delete/account/:id', deleteUser);


module.exports = router;