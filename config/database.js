require('dotenv').config()
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize((process.env.DB_NAME || 'node_js'), (process.env.DB_USERNAME || 'root'), (process.env.DB_PASSWORD || 'secret'), {
    host: (process.env.DB_HOST || 'Homestead'),
    dialect: (process.env.DB_CONNECTION || 'mysql'),
    port: (process.env.DB_PORT || 3306)
});

const checkDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = { sequelize, checkDatabaseConnection };