const { Router } = require("express");
const router = Router();
const {  putUser, deleteUser, getUsers, getUserById } = require("../controllers/users");

router.put('/update/:id', putUser);
router.delete('/delete/:id', deleteUser);
router.get('/', getUsers);
router.get('/:id', getUserById);



module.exports = router;