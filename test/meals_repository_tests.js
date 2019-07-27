/* eslint-disable no-unused-vars */
const mealsRepository = require("./../lib/repository/meals_repository");
const should = require("chai").should();
const mongoose = require("mongoose");

describe("Testing save and find function from repository", function() {
    it("should save the model to the repository and then retrieve it properly", async function(){
        let meal = {
            soup: "batata frita",
            meat: "Vitela assada",
            fish: "Sardinhas",
            veggie: "Salada",
            cantine: "FEUP",
            day: new Date("1995-12-17T03:24:00"),
            lunch: true
        };
        mealsRepository.save(meal);
        let savedMeal = await mealsRepository.find(meal);
        console.log(savedMeal);
        // should.equal(savedMeal, !null);
    });
});