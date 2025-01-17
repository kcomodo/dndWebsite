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
/*
router.get('/userinfo/:email', async (req, res) => {
    const email = req.params.email;

    try {
        // Query the database
        const [rows] = await pool.execute(
            'SELECT user_id, username, userEmail FROM userInfo WHERE userEmail = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user info
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving user information' });
    }
});
*/
// CRUD - Get User by Email (GET request)
//http://localhost:1337/api/users/testing%40gmail.com
router.get('/users/:userEmail', (req, res) => {
    const userEmail = req.params.userEmail;
    const sql = "SELECT * FROM userInfo WHERE userEmail = ?";

    con.query(sql, [userEmail], function (err, result) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(result[0]);
    });
});

/*
// Frontend (React) example using fetch
const getUserInfo = async (email) => {
    try {
        const response = await fetch(`/api/getUserInfo?userEmail=${encodeURIComponent(email)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};
*/
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
