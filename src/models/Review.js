const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
  
        });
};