const mysql = require("mysql");
require("dotenv").config();

const connetion = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = connetion;
