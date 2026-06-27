// the first  step is to import the express modules and dotenv
const express = require('express');
const dotenv = require('dotenv');

//the second step us to initialize the express app and configure dotenv
const app = express();
dotenv.config();

// the third step is to add the built in body parser middleware to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// defining the simple test route
app.get('/', (req, res) => {
    res.send('Hello, Express World!');
});

