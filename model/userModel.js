const { sequelize } = require("../config/database");
const { Sequelize } = require('sequelize');

const userModel = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.BOOLEAN
    },
})

userModel.sync()

module.exports = userModel;