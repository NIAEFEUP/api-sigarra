const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/testdb";
import { Meal } from "./../model/meal";

mongoose.connect(MONGO_URI, { useNewUrlParser: true }).then(() => {
    console.log("====================================");
    console.log("Connected to Mongo DB");
    console.log("====================================");
});


const Model = mongoose.model("Meal", Meal);

module.exports= {
    save: function(data){
        let meal = new Model(data);
        meal.save(function(error){
            console.log("Saved new meal");
            if(error)
                console.error(error);
        });
    },
    find: function(data){
        return Model.find(data, function(err, meal){
            if(err) return null;
            return meal;
        });
    }
};



