// routes/user.js

var express = require('express');
var router = express.Router();
var con = require('../demoConnection');  // Import the MySQL connection

// CRUD - Create User (POST request)
router.post('/user', (req, res) => {
    const { username, userPassword, userEmail } = req.body;
    const sql = `INSERT INTO userInfo (username, userPassword, userEmail) VALUES (?, ?, ?)`;

    con.query(sql, [username, userPassword, userEmail], function (err, result) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: "User created successfully" });
    });
});

// CRUD - Get Users (GET request)
router.get('/users', (req, res) => {
    const sql = "SELECT * FROM userInfo";

    con.query(sql, function (err, result) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(result);
    });
});

// Export the router to use in server.js
module.exports = router;


//DB - CREATE DB
/*
con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});
*/
//DB - CREATE TABLE
/*
 var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
 con.query(sql, function (err, result) {
 if (err) throw err;
 console.log("Table created");
});
*/

//DB - ALTER TABLE
/*
  var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table altered");
});
*/

//CRUD - INSERT
/*
  var sql = "INSERT INTO userInfo (username, userPassword, userEmail) VALUES ('testing', 'testing1234', 'testing@gmail.com')";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});
*/
//CRUD - DELETE
/*
var sql = "DELETE FROM userInfo WHERE email = 'testing@gmail.com'";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
});
*/
//CRUD UPDATE
/*
  var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
con.query(sql, function (err, result) {
if (err) throw err;
console.log(result.affectedRows + " record(s) updated");
});
*/
