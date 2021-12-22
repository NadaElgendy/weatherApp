// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

// Require Cors to run server and routes
const cors = require("cors");
app.use(cors());

// Require body parser to run server and routes
const bodyParser = require("body-parser");
app.use(bodyParser());

// Add port
const PORT = 1111;
app.listen(PORT, function() {
  console.log(`server running on port ${PORT}`);
});

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

// Callback function to complete GET '/all'
const getAll = (req, res) => res.status(200).send(projectData);
// Get route
app.get("/all", getAll);

// Callback function to complete POST '/add'
const postData = (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
};
// Post route
app.post("/add", postData);
