const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("What are you doing here?");
});


module.exports = {
    app: app,
    port: PORT
};