'use strict';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 1337;

// Create an Express app
var app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());


// Import user routes from the routes folder
var userRoutes = require('./routes/user');

// Use user routes for any endpoint starting with '/api'
app.use('/api', userRoutes);

// Create and run the HTTP server
http.createServer(app).listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);
});
