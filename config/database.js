// require('dotenv').config();

// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'srv643026.hstgr.cloud',
//     port: 3306,
//     user: 'Stock1',
//     password: 'Todaymedia@123456', // Replace with the actual password
//     database: 'Stock',
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Unable to connect to the database:', err.message);
//     } else {
//         console.log('Database is live and accessible!');
//     }
//     connection.end();
// });

// require('dotenv').config();

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
