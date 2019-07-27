const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/testdb";
const mealModel = require("../model/meal");
const Meal = mealModel.meal;

mongoose.connect(MONGO_URI, { useNewUrlParser: true }).then(() => {
    console.log("====================================");
    console.log("Connected to Mongo DB");
    console.log("====================================");
});


const Model = mongoose.model("Meal", Meal);

module.exports= {
    save: function(data){
        console.log("Saving new meal");
        let meal = new Model(data);
        meal.save(function(error){
            console.log("Saved new meal");
            if(error)
                console.error(`ERROR: ${error}`);
        });
    },
    find: function(data){
        return Model.findOne(data, function(err, meal){
            if(err) return null;
            return console.log(meal);
        });
    }
};



