var pg = require('pg')
var config = {
    user: "postgres",
    host: "localhost",
    database: "dic_v1",
    password: "ppBaran123!@#",
    port: 5432,
}
var pool = new pg.Pool(config);
module.exports = pool;