const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

const PORT = process.env.PORT || 3000;

let connected = false;
if(process.env.NODE_ENV !== 'test') {
    
    console.log('Trying to connect to Mongo DB...');
    
    mongoose.connect('mongodb://mongo:27017/testdb', {useNewUrlParser: true} ).then(() => {
        connected = true;
        console.log('====================================');
        console.log('Connected to Mongo DB');
        console.log('====================================');
    });
}


app.get("/", (req, res) => res.send(`Hello World!`));


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
