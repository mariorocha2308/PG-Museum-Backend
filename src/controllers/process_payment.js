const { Process_payment } = require('../db');
const mercadopago = require("mercadopago");

async function postProcessPayment(req, res, next) {
    mercadopago.configurations.setAccessToken("TEST-919204976846897-020212-10319e6bacd88c552de7db0855b041c4-43204632");
    // const payment_data = await Process_payment.create({
    const payment_data = {
        transaction_amount: req.body.transaction_amount,
        token: req.body.token,
        description: req.body.description,
        installments: Number(req.body.installments),
        payment_method_id: req.body.paymentMethodId,
        issuer_id: req.body.issuer,
        payer: {
            email: req.body.payer.email,
            identification: {
                type: req.body.payer.docType,
                number: req.body.payer.docNumber,
            },
        },
    }
    // )
    mercadopago.payment
        .save(payment_data)
        .then(async(response) => {

            return res.status(response.status).json({
                status: response.body.status,
                status_detail: response.body.status_detail,
                id: response.body.id,
                date_created: response.body.date_created,
                date_approved: response.body.date_approved,
                operation_type: response.body.operation_type,
                issuer_id: response.body.issuer_id-1,
                payment_method_id: response.body.paymentMethodId,
                payment_type_id: response.body.payment_type_id,
                status_detail: response.body.status_detail,
                currency_id: response.body.currency_id,
                description: response.body.description,
                taxes_amount: response.body.taxes_amount,
                email: response.body.payer.email,
                identification_type: response.body.payer.identification.type,
                identification_number: response.body.payer.identification.number,
                card_first_six_digits: response.body.card.first_six_digits,
                card_last_four_digits: response.body.card.last_four_digits,
                card_expiration_month: response.body.card.expiration_month,
                card_expiration_year: response.body.card.expiration_year,
                card_date_created: response.body.card.date_created,
                card_date_last_updated: response.body.card.date_last_updated,
                cardholder: response.body.card.cardholder.name
            });
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
}

async function getAllProcessPayment(req, res, next) {
    try {
        const processPayment = await Process_payment.findAll();
        res.json(processPayment);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllProcessPayment,
    postProcessPayment
}

