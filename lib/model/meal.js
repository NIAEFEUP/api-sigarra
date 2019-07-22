const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const Meal = new Schema({
    id: ObjectID,
    soup: String,
    meat: String,
    fish: String,
    veggie: String,
    day: Date,
});


module.exports.meal = Meal;