const { Router } = require("express");
const router = Router();
const {   
    getApiToDb,
    getByName,
    postArtwork,
    getArtworkById,
    putArtworkById,
    deleteArtworkById
} = require("../controllers/artworks.js");

router.get('/all', getApiToDb);
router.get('/name', getByName);
router.post('/post', postArtwork);
router.get('/:id', getArtworkById);
router.put('/put/:id', putArtworkById);
router.delete('/delete/:id', deleteArtworkById);


module.exports = router;