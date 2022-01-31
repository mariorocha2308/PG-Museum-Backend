const { Router } = require('express');
const {  getAllRating, postRating, getIdRating } = require('../controllers/rating');

const router = Router();

router.get('/', getAllRating)
router.post('/post', postRating);
router.get('/:id', getIdRating);

module.exports = router;
