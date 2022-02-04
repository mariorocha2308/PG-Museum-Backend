const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('process_payment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        status_: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
        },
        products: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        total_price: {
            type: DataTypes.INTEGER,
        },
        payment_method_id: {
            type: DataTypes.STRING,
        },
        payment_type_id: {
            type: DataTypes.STRING,
        },
        date_approved: {
            type: DataTypes.STRING,
        },
        operation_type: {
            type: DataTypes.STRING,
        },
        status_detail: {
            type: DataTypes.STRING,
        },
        currency_id: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        identification_type: {
            type: DataTypes.STRING,
        },
        identification_number: {
            type: DataTypes.STRING,
        },
        card_last_four_digits: {
            type: DataTypes.STRING,
        },
        card_expiration_year: {
            type: DataTypes.INTEGER,
        },
        cardholder: {
            type: DataTypes.STRING,
        }
    });
};

