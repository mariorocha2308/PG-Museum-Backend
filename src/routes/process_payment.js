const { Router } = require('express');
const {  getAllProcessPayment, postProcessPayment } = require('../controllers/process_payment');

const router = Router();

router.get('/', getAllProcessPayment)
router.post('/post', postProcessPayment);

module.exports = router;