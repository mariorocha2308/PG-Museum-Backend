const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('process_payment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        credit_card: {
            type: DataTypes.STRING,
        },
        total: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        artworksId: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        username: {
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

