const { Router } = require("express");
const router = Router();
const { postShoppingCart, getShoppingCart, getShoppingCartById } = require("../controllers/shopping_carts");


router.post('/post', postShoppingCart);
router.get('/all', getShoppingCart);
router.get('/:id', getShoppingCartById);



module.exports = router;