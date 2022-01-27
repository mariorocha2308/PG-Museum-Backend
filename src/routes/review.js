const { Router } = require('express');
const { getAllReview, postReview, getIdReview } = require('../controllers/review');

const router = Router();

router.get('/', getAllReview)
router.post('/', postReview);
router.get('/:id', getIdReview);

module.exports = router;