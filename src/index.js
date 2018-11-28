const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/testdb";

let connected = false;
console.log("Trying to connect to Mongo DB...");

if(process.env.NODE_ENV === "production") {

    if(!process.env.MONGO_URI) {
        console.error("MONGO_URI was not defined in .env file! Falling back to default");
    }
}

mongoose.connect(MONGO_URI, {useNewUrlParser: true} ).then(() => {
    connected = true;
    console.log("====================================");
    console.log("Connected to Mongo DB");
    console.log("====================================");
});


app.get("/", (req, res) => {
    if(connected) {
        res.send("Hello World! I am connected to a Database!");
    } else {
        res.send("Hello World! I am not yet connected to a Database. If you refresh me, probably I will be already");
    }
});


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
