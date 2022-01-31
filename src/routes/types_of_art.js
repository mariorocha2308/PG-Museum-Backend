const { Router } = require("express");
const router = Router();
const { getTypes, deleteType, postType } = require("../controllers/types_of_art");

router.delete('/delete/:id', deleteType)
router.post('/post', postType)
router.get('/', async (req, res, next) => {
    try {
        return res.status(200).send(await getTypes());
    } catch (error) {
        return res.status(404).send(error, '||ERROR|| NOT TYPES ||ERROR||');
    }
});


module.exports = router;