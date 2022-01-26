const { Review } = require("../db");

async function getReview() {
    try {
        const review = await Review.find();
        return review;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getReview
};
// siiiiiiii ju ju vamos a lo de mario mucha sintaxis jua
