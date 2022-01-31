const { Router } = require('express');
const { getAllReview, postReview, getIdReview, putIdReview } = require('../controllers/review');

const router = Router();

router.get('/', getAllReview)
router.post('/post', postReview);
router.get('/:id', getIdReview);
router.put('/put/:id', putIdReview);

module.exports = router;
