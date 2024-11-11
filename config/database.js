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

// require('dotenv').config();

// const mysql = require('mysql');
// const dbconnection = mysql.createConnection({
//     host: 'sql12.freesqldatabase.com',
//     user: 'sql12743226',
//     password: 'xcCzRVcIga',
//     database: 'sql12743226',
//     // port: 3306
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
