var chai = require("chai");
var expect = chai.expect;
var should = chai.should();

describe("Basic Mocha String Test", function () {
    it("should return number of characters in a string", function () {
        should.equal("Hello".length, 5);
    });
    it("should return first character of the string", function () {
        should.equal("Hello".charAt(0), "H");
    });
});

describe("Basic Mocha Values Test", function () {
    it("should return (3 == 3) true", function () {
        should.equal(3, 3);
    });
    it("should return (3 > 5) false", function () {
        expect(3 > 5).to.be.false;
    });
});
