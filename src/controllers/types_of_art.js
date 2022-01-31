const { Type } = require("../db");

async function getTypes() {
    const foundTypeDb = await Type.findAll();
    try {
        if (foundTypeDb.length !== 0) {
            return foundTypeDb;
        } else {
            const objTypes = [
                'Painting', 'Furniture and woodwork', 'Ceramic', 'Drawing', 'Metalwork', 'Sculpture', 'Bound Volume', 'Silver',
                'Textile', 'Jade', 'Carpet', 'Funerary Equipment', 'Miscellaneous', 'Print', 'Lacquer', 'Mixed Media',
                'Jewelry', 'Glass', 'Arms and Armor', 'Enamel', 'Implements', 'Tapestry', 'Ivory', 'Wood', 'Mosaic', 'Manuscript',
                'Lamp', 'Timepiece', 'Mask', 'Cosmetic Objects', 'Garment', 'Miniature', 'Portrait Miniature', 'Glyptic', 'Photograph', 'Amulets', 'Inlays', 'Basketry'
            ];
            let results = objTypes.map(element => {
                Type.findOrCreate({
                    where: {
                        type: element
                    }
                });
            });
            return results;
        }
    } catch (error) {
        return 'no esta ingresando en el get de types' + error;
    }
};

async function postType(req, res, next) {
    try {
        const { type } = req.body;
        const foundTypeDb = await Type.findOne({
            where: {
                type: type
            }
        });
        if (foundTypeDb) {
            return foundTypeDb;
        } else {
            const newType = await Type.create({
                type: type
            });
            return res.status(200).json(newType);
        }
    } catch (error) {
        next(error);
    }
};

async function deleteType(req, res, next) {
    try {
        const id = req.params.id;
        const foundTypeDb = await Type.findOne({
            where: {
                id: id
            }
        });
        if (foundTypeDb) {
            await foundTypeDb.destroy();
            return res.status(200).json(foundTypeDb);
        } else {
            return 'el id ingresado no corresponde a ningun type';
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getTypes,
    deleteType,
    postType
};