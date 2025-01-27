
const http = require('http');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2');
const crypto = require('crypto');
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

function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        con.execute(query, params, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result)
        });
    });
}

async function updateExpireDate(clientEmail) {
    const newDate = new Date(new Date().setDate(new Date().getDate() + 7));
    const query = "UPDATE userInfo SET authExpire = ? WHERE userEmail = ?";
    const params = [newDate, clientEmail];
    await executeQuery(query, params);
}

async function obtainToken(clientEmail) {
    const token = crypto.randomBytes(16).toString('hex');
    const query = "UPDATE userInfo SET authCode = ? WHERE userEmail = ?";
    const params = [token, clientEmail];
    await executeQuery(query, params);
    await updateExpireDate(clientEmail);
    return token;
}

async function authorizeToken(clientEmail) {
    const query = "SELECT authCode, authExpire FROM userInfo WHERE userEmail = ?";
    const params = [clientEmail];
    const result = await executeQuery(query, params);

    const curDate = new Date();

    if (curDate > result[0].authExpire) {
        return await obtainToken(clientEmail);
    } else {
        console.log("not expired");
        return result[0].authCode;
        }
}

function validatePW(clientPW, passwordSalt, userPW) {
    var hash = crypto.createHash('sha256');
    hash.update(clientPW);
    var pwHash = hash.digest('hex');
    hash = crypto.createHash('sha256');
    hash.update(clientPW+passwordSalt+clientPW);
    pwHash = hash.digest('hex');
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

app.post("/login", cors(corsOptions), function(req, res){
    console.log(req.body);
    const clientEmail = req.body.clientEmail;
    const clientPW = req.body.clientPW;

    con.execute("SELECT * FROM userInfo WHERE userEmail = ?", [clientEmail], async function (err, result) {
        if (err) {res.send("Email is invalid")}

        if (!validatePW(clientPW, result[0].passwordSalt, result[0].userPassword.toString())) {
            res.send("Password is invalid");
        }   

        const token = await authorizeToken(clientEmail);
        console.log(token)

        if (token != false) {
            const userData = {
                userName: result[0].username,
                authCode: token
            };
            res.send(userData)
        };
    });
})

app.post("/newLogin", cors(corsOptions), function(req, res) {
    console.log(req);
    const clientUsername = req.body.clientUsername;
    const clientEmail = req.body.clientEmail;
    const clientPW = req.body.clientPW;

    con.query("INSERT INTO userInfo (username, userPassword, userEmail) VALUES (?, ?, ?)", [clientUsername, clientPW, clientEmail], async function (err, result) {
        if (err) {console.log(err); if (err.errno === 1062) {res.send("Email already in use")}}
        else {
            res.send(true);
        }
    })
})
// Create and run the HTTP server
http.createServer(app).listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);
});
