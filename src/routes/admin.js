const { Router } = require("express");
const router = Router();
const { getUsers, getUserById, putUser, deleteUser } = require("../controllers/users");


router.get('/users', getUsers);

router.get('/users/:id', getUserById);
/* router.post('/create', postUser) */
/* router.get('/search', getUserByName); */
router.put('/update/user/:id', putUser);
router.delete('/delete/user/:id', deleteUser);


module.exports = router;
