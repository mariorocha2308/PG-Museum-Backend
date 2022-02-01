const { Router } = require('express');
const {  getAllpurchaseOrder, postPurchaseOrder, getIdPurchaseOrder, putPurchaseOrder } = require('../controllers/purchaseOrder');

const router = Router();

router.get('/', getAllpurchaseOrder)
router.post('/post', postPurchaseOrder);
router.get('/:id', getIdPurchaseOrder);
router.put('/put/:id', putPurchaseOrder);

module.exports = router;