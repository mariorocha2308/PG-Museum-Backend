const { Router } = require('express');
const {  getAllProcessPayment, postProcessPayment } = require('../controllers/process_payment');
const { getAllProcessPaymentDb, postProcessPaymentDb, getByIdProcessPaymentDb } = require('../controllers/paymentDb');

const router = Router();

router.get('/', getAllProcessPayment)
router.post('/post', postProcessPayment);

router.post('/db/post', postProcessPaymentDb);
router.get('/db/', getAllProcessPaymentDb);
router.get('/db/:id', getByIdProcessPaymentDb);

module.exports = router;