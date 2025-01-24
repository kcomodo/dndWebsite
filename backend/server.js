
const http = require('http');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2');
const crypto = require('crypto');
const { getMaxListeners } = require('events');
const port = process.env.PORT || 1337;

console.log(process.env.HOST);
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

async function obtainToken(clientEmail) {
    const token = crypto.randomBytes(16).toString('hex');
    con.query(`UPDATE userInfo SET authCode = '${token}' WHERE userEmail = '${clientEmail}'`, async function(err, result) {
        if (err) {console.log(err); return false}
        else {console.log(result); return token}
    });
}

async function authorizeToken(clientEmail) {
    con.query(`SELECT authCode, authExpire FROM userInfo WHERE userEmail = '${clientEmail}'`, async function (err, result) {
        if (err) {console.log(err); return false;}
        else {
            const curDate = new Date();

            if (curDate > result[0].authExpire) {
                console.log("outdated");
                return await obtainToken(clientEmail);
            }
        }

    console.log("not expired");
    return result[0].authCode;
});
}

function validatePW(clientPW, passwordSalt, userPW) {
    console.log(clientPW+", "+passwordSalt);
    var hash = crypto.createHash('sha256');
    hash.update(clientPW);
    var pwHash = hash.digest('hex');
    hash = crypto.createHash('sha256');
    hash.update(clientPW+passwordSalt+clientPW);
    pwHash = hash.digest('hex');
    console.log(pwHash);
    console.log(userPW);
    if (pwHash == userPW) {
        return true;
    }
    return false;
}

function test() {
    con.query(`SELECT * FROM userInfo WHERE user_id = 1`, function (err, result) {
        if (err) {console.log(err)}
        else {
            console.log(result[0].userPassword.toString());
        }
        });
}

app.post("/login", cors(corsOptions), async function(req, res){
    console.log(req.body);
    const clientEmail = req.body.clientEmail;
    const clientPW = req.body.clientPW;
    console.log(clientEmail+", "+clientPW);

    con.query(`SELECT * FROM userInfo WHERE userEmail = '${clientEmail}'`, async function (err, result) {
        if (err) {res.send("Email is invalid")}

        if (!validatePW(clientPW, result[0].passwordSalt, result[0].userPassword.toString())) {
            res.send("Password is invalid");
        }   

        const token = await authorizeToken(clientEmail);

        if (token != false) {
            console.log("e")
            const userData = {
                userName: result[0].username,
                authCode: token
            };
            res.send(userData)
        };
    });
})

// Create and run the HTTP server
http.createServer(app).listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);
});
