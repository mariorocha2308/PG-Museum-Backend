const { Process_payment } = require('../db');

async function postProcessPaymentDb(req, res, next) {
    try {
        // console.log("res.body es________: ", req.body);
    const processPayment = await Process_payment.create({
        state: req.body.status,
        date: req.body.date_created,
        total: req.body.total,
        credit_card: req.body.payment_method_id,
        userId: req.body.user_id,
        artworksId: req.body.products,
        
        id: req.body.id,
        status_detail: req.body.status_detail,
        username: req.body.username,
        date_approved: req.body.date_approved,
        operation_type: req.body.operation_type,
        payment_type_id: req.body.payment_type_id,
        currency_id: req.body.currency_id,
        description: req.body.description,
        email: req.body.email,
        identification_type: req.body.identification_type,
        identification_number: req.body.identification_number,
        card_last_four_digits: req.body.card_last_four_digits,
        card_expiration_year: req.body.card_expiration_year,
        cardholder: req.body.cardholder,
    });
    res.json(processPayment);
    } catch (error) {
        next(error);
    }
}
            
async function getAllProcessPaymentDb(req, res, next) {
    try {
        const processPayment = await Process_payment.findAll();
        res.json(processPayment);
    } catch (error) {
        next(error);
    }
}


async function getByIdProcessPaymentDb (req, res, next) {
    try {
        const processPayment = await Process_payment.findOne({
            where: {
                userId: req.params.id
            }
        });
        res.json(processPayment);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllProcessPaymentDb,
    postProcessPaymentDb,
    getByIdProcessPaymentDb
}
