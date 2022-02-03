const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('process_payment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    });
};