// require('dotenv').config();

// const mysql = require('mysql');
// const dbconnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'stock'
// });
// dbconnection.connect(function (err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("Connected to database!");
//     }
// });

// module.exports = dbconnection;

require('dotenv').config();

const mysql = require('mysql');
const dbconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306  // Default to 3306 if DB_PORT is not specified
});

dbconnection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database!");
    }
});

module.exports = dbconnection;
