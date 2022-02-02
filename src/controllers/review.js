const { Review } = require('../db');

async function postReview(req, res, next) {
    try {
        const { description, artworkId, rating, userId } = req.body;
        const reviewData = await Review.create({
            description,
            rating,
            userId,
            artworkId
        })
        return res.json(reviewData);

    } catch (err) {
        next(err);
    }
}

async function getAllReview(req, res) {

    const data = await Review.findAll();
    if (data) {
        try {
            return res.json(data);
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("No data found");
        res.send("No review in db");
    }
    res.send(data);
}


async function getIdReview(req, res, next) {
    const id = req.params.id;
    if (!id) next({ msg: 'no mando id', status: 500 })

    try {

        const data = await Review.findAll({
            where: { artworkId: id },
            attributes: ["id", "description"],
        });

        console.log("soy data ", data);

        return res.json(data);
    } catch (err) {
        next(err);
    }
}

async function putIdReview(req, res, next) {
    const id = req.params.id;
    if (!id) next({ msg: 'no mando id', status: 500 })
    try {
        let data = await Review.findByPk(req.params.id);
        data.update(req.body);

        res.status(202).send({ data, message: "Review Actualizado Exitosamente" });
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getAllReview,
    postReview,
    getIdReview,
    putIdReview
}