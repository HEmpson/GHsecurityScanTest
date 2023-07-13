// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Serve
const port = 8080;
const server = app.listen(port, () => { console.log(`server running on ${port}`) });

const getData = (req, res) => {
    res.send(projectData);
}

const addPost =  (req, res) => {
    
    const data = req.body;
    const newData = {
        temperature: data.temperature,
        date: data.date,
        userResponse: data.userResponse
    } 
    projectData['latest'] = newData;
    res.send(projectData);


    let user = req.body;
    connection.query("SELECT * FROM table WHERE userid = " + user);
}




app.post('/addPost', addPost)
app.get('/all', getData)
