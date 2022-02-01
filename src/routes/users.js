const { Router } = require("express");
const router = Router();
const {  putUser, deleteUser, getUsers, getUserById } = require("../controllers/users");

router.put('/put/:id', putUser);
router.delete('/delete/:id', deleteUser);
router.get('/all', getUsers);
router.get('/:id', getUserById);




module.exports = router;