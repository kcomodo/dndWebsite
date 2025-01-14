var mysql = require('mysql');

var con = mysql.createConnection({
    host: "database-1.czkm6ku6ooe0.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "rv4OTcPJthaPqoMawUxK",
    database: "dnddatabaseinfo"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
module.exports = con;