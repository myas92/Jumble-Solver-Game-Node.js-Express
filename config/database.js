const pg = require('pg')
const config = {
    user: "postgres",
    host: "localhost",
    database: "dic_v1",
    password: process.env.DB_PASSWORD,
    port: 5432,
}
const pool = new pg.Pool(config);
module.exports = pool;