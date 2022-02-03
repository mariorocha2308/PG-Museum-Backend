const { Process_payment } = require('../db');
const mercadopago = require("mercadopago");

async function postProcessPayment(req, res, next) {
    mercadopago.configurations.setAccessToken("TEST-a444b3ce-cbb6-4f66-b2d9-4a850880f115");
    const payment_data = await Process_payment.create({
    // const payment_data = {
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
    )
    mercadopago.payment
        .save(payment_data)
        .then((response) => {
            return res.status(response.status).json({
                status: response.body.status,
                status_detail: response.body.status_detail,
                id: response.body.id,
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


// post sample
// {
//     "transaction_amount": 2,
//     "token": "req.body.token",
//     "description": "req.body.description",
//     "installments": 2,
//     "payment_method_id": 2,
//     "issuer_id": 2,
//     "payer": {
//         "email": "req.body.payer.email",
//         "identification": {
//             "type": "req.body.payer.docType",
//             "number": 2
//         }
//     }
// }