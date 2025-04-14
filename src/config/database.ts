import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

// Ensure DB_CONNECTION is a valid Sequelize dialect type
const dbDialect: Dialect = process.env.DB_CONNECTION as Dialect || 'mysql'; // default to 'mysql'

const sequelize = new Sequelize(
  process.env.DB_NAME || 'node_js',
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || 'secret',
  {
    host: process.env.DB_HOST || 'localhost', // default to 'localhost'
    dialect: dbDialect,
    port: parseInt(process.env.DB_PORT || '3306', 10), // Ensure DB_PORT is parsed as an integer
  }
);

// Function to check database connection
const checkDatabaseConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Export sequelize instance and connection check function
export { sequelize, checkDatabaseConnection };
