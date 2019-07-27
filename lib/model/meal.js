const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    soup: String,
    meat: String,
    fish: String,
    veggie: String,
    cantine: String,
    day: Date,
    lunch: Boolean,
});


module.exports.meal = mongoose.model("Meal", MealSchema);