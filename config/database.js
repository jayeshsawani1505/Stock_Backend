require('dotenv').config();

const mysql = require('mysql');
const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stock'
});
dbconnection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected to database!");
    }
});

module.exports = dbconnection;