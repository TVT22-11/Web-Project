const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    },
    fname: {
        type: DataTypes.STRING
    },
    lname: {
        type: DataTypes.STRING
    },
});