const { Router } = require("express");
const router = Router();
const { getReview } = require("../controllers/review");


router.get('/', getReview)


module.exports = router;