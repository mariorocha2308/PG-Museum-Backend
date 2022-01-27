const { Review } = require('../db');

async function postReview( req, res, next){
    try{
        const {description, artworkId } = req.body;
        const reviewData = await Review.create({
            description,
            artworkId
        })
        return res.json(reviewData);

    }catch(err){
        next(err);
    }
}

async function getAllReview(req, res ){
    
    const data = await Review.findAll();
    if(data){
        try{
            return res.json(data);
        }catch(err){
            console.log(err);
        }
    }else{
        console.log("No data found");
        res.send("No review in db");
    }
    res.send(data);
}

async function getIdReview( req, res, next){
    const id  = req.params.id;
    if(!id) next({msg: 'no mando id', status: 500})

    try{
 
        const data =  await Review.findAll({
            where: { artworkId: id },
            attributes: ["id", "description"],
        });
        
         console.log("soy data ", data);
        
        return res.json(data);
    }catch(err){
        next(err);
    }
}


module.exports = {
    getAllReview, 
    postReview,
    getIdReview
}