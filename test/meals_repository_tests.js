const mealsRepository = require("./../lib/repository/meals_repository");
const chai = require("chai");
const should = chai.should();

describe("Testing repository functions", function() {
    let meal = {
        soup: "batata frita",
        meat: "Vitela assada",
        fish: "Sardinhas",
        veggie: "Salada",
        cantine: "FEUP",
        day: new Date("1995-12-17T03:24:00"),
        lunch: true
    };
    it("should save the model to the repository and then retrieve it properly", async function(){
        await mealsRepository.save(meal);
        let savedMeal = await mealsRepository.find(meal);
        should.equal(savedMeal.soup, meal.soup);
        should.equal(savedMeal.meat, meal.meat);
        should.equal(savedMeal.fish, meal.fish);
        should.equal(savedMeal.veggie, meal.veggie);
        should.equal(savedMeal.cantine, meal.cantine);
        should.equal(savedMeal.lunch, meal.lunch);
        mealsRepository.delete(meal);
    });

    it("should have the model at first but then it should have been deleted", async function(){
        meal.meat = "Vitela";
        await mealsRepository.save(meal);
        let deletion = await mealsRepository.delete(meal);
        should.equal(deletion.deletedCount, 1);
    });
});