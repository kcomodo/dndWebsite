'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2');
const port = process.env.PORT || 1337;

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.ROOT_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect(function (err) {
    if (err) {console.log(err)}
    else {console.log("Connected!")};
});

const corsOptions = {
    origin: "https:localhost:4200",
    optionsSucessStatus: 204,
    credentials: true,
};

// Create an Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use user routes for any endpoint starting with '/api'
app.use(cors());

//using this to handle preflight requests so that they also intake the corsOptions
app.options('*', cors(corsOptions));

function authorizeToken(clientEmail) {
    con.query(`SELECT authCode, authExpire FROM userInfo WHERE userEmail = ${clientEmail}`, function (err, result) {
        if (err) {console.log(err);}
        else {
            const curDate = new Date();

            if (curDate > result[0].authExpire) {
                return obtainToken();
            }
        }

    return result[0].authCode;
});
}

function obtainToken() {

}

app.post("/login", cors(corsOptions), async function(req, res){
    console.log(req.body);
    const clientEmail = req.body.clientEmail;
    const clientPW = req.body.clientPW;
    console.log(clientEmail+", "+clientPW);

    con.query(`SELECT * FROM userInfo WHERE clientEmail = ${clientEmail}`, function (err, result) {
        if (err) {res.send("Email is invalid")}

        if (result[0].userPassword != clientPW) {
            res.send("Password is invalid");
        } 

        const token = authorizeToken(clientEmail);

        if (token != false) {
            const userData = {
                userName: result[0].username,
                authCode: result[0].authCode
            };
            res.send(userData)
        }
    });
})

// Create and run the HTTP server
http.createServer(app).listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);
});
