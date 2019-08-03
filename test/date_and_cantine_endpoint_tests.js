require("../web/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mealsRepository = require("../lib/repository/meals_repository");
chai.use(chaiHttp);
require("dotenv").config();
const PORT = process.env.PORT || 3000;

describe("Testing get endpoint", function(){
    let meal = {
        soup: "batata frita",
        meat: "Vitela assada",
        fish: "Sardinhas",
        veggie: "Salada",
        cantine: "FEUP",
        day: "1995-12-17",
        lunch: true
    };
    const baseUrl = `http://localhost:${PORT}`;
    mealsRepository.save(meal);
    it("should return a meal", function(){
        chai
            .request(baseUrl)
            .get(`/meals/${meal.day}/${meal.cantine}`)
            .end((err, result) => {
                result.should.have.status(200);
            });
    });
    it("should NOT return a meal", function(){
        chai
            .request(baseUrl)
            .get(`/meals/${meal.day}/${meal.cantine}2`)
            .end((err, result) => {
                result.should.have.status(404);
            });
    });
    this.afterAll(function(){
        mealsRepository.delete(meal);
    });
});