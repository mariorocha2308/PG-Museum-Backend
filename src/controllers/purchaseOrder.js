const { PurchaseOrder, User } = require('../db');

async function getAllpurchaseOrder(req, res, next) {
    try {
        const data = await PurchaseOrder.findAll({
            include: 
                {
                    model: User,
                }
            
        });
        return res.json(data);
    } catch (err) {
        next(err);
    }
}

async function postPurchaseOrder(req, res, next) {
    try {
        const { userId } = req.body;
        const purchaseOrderData = await PurchaseOrder.create({
            state: req.body.state, // "in process"  "created"  "loaded"  o "cancelled"
            date: req.body.date,
            total: req.body.total,
            credit_card: req.body.credit_card,
            userId,
            artworksId: req.body.artworksId, 
        });
        return res.json(purchaseOrderData);
    } catch (err) {
        next(err);
    }
}

async function getIdPurchaseOrder(req, res, next) {
    const id = req.params.id;
    if (!id) next({ msg: 'no hay id', status: 500 })
    try {
        const data = await PurchaseOrder.findAll({
            where: { id },
            include: 
                {
                    model: User,

                }

        });
        return res.json(data);
    } catch (err) {
        next(err);
    }
}


async function putPurchaseOrder(req, res, next) {
    const id = req.params.id;
    if (!id) next({ msg: 'no mando id', status: 500 })
    try {
        let data = await PurchaseOrder.findByPk(req.params.id);
        data.update(req.body);

        res.status(202).send({ data, message: "Purchase Order Actualizado Exitosamente" });
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
      getAllpurchaseOrder, 
      postPurchaseOrder, 
      getIdPurchaseOrder, 
      putPurchaseOrder
}
