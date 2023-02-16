const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    password: process.env.PASS,
    database: process.env.DATABASE,
    user: process.env.USER,
})
module.exports = db;