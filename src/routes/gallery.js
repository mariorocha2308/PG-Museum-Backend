const { Router } = require("express");
const router = Router();
const { postGallery, getGallery, putGallery } = require("../controllers/gallery");


router.post('/post', postGallery);
router.get('/:id', getGallery);
router.put('/put/:id', putGallery);

module.exports = router;