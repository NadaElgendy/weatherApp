// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Require Cors to run server and routes
const cors = require('cors');
app.use(cors());

// Require body parser to run server and routes
const bodyParser = require('body-parser');
app.use(bodyParser());

// Add port
const PORT = 1111;
app.listen(PORT, function (){
    console.log(`server running on port ${PORT}`);
});



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server