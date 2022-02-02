const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('process_payment', {
        transaction_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        issuer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        installments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payer: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    });
};