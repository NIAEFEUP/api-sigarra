const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/testdb";
const mealModel = require("../model/meal");
const Meal = mealModel.meal;

mongoose.connect(MONGO_URI, { useNewUrlParser: true }).then(() => {
    console.log("====================================");
    console.log("Connected to Mongo DB");
    console.log("====================================");
});

module.exports= {
    save: async function(data){
        return Meal.create(data, function(error, meal){
            if(error && meal == null)
                console.error(`ERROR: ${error}`);
        });
    },
    find: async function(data){
        let meal = {};
        await Meal.findOne(data, function(err, found_meal){
            if(err) {
                console.log(err);
            }
            meal = found_meal;
        });
        return meal;
    },
    delete: async function(data){
        return await Meal.deleteMany(data);
    }
};



