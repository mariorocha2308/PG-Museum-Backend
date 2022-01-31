const { Rating, Artwork, User } = require('../db');

async function getAllRating(req, res, next) {
    try {
        const data = await Rating.findAll({
            include: [
                {
                    model: Artwork,
                    attributes: ["id", "title", "price"]
                },
                {
                    model: User,
                    attributes: ["id", "username", "image"]
                }
            ]
        });
        return res.json(data);
    } catch (err) {
        next(err);
    }
}

async function postRating(req, res, next) {
    try {
        const { rating, artworkId, userId } = req.body;
        const ratingData = await Rating.create({
            rating,
            artworkId,
        })
        ratingData.addUsers(userId);
        return res.json(ratingData);
    } catch (err) {
        next(err);
    }
}

async function getIdRating(req, res, next) {
    const id = req.params.id;
    if (!id) next({ msg: 'no hay id', status: 500 })
    try {
        const data = await Rating.findAll({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ["id", "username", "image"]
                },
                {
                    model: Artwork,
                    attributes: ["id", "title", "price"]
                }
            ]
        });
        return res.json(data);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAllRating,
    postRating,
    getIdRating
}

