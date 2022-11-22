require('dotenv').config();

export const DATABASE_CONFIG = {
  port: 3306,
  host: 'localhost',
  database: 'music',
  username: 'root',
  password: 'daikax1xktn',
};

export const PROD_DATABASE_CONFIG = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};
