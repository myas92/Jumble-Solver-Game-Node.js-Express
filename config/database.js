require('dotenv').config();
const pg = require('pg');
const config = {
    user: "postgres",
    host: "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
}
const pool = new pg.Pool(config);
module.exports = pool;