const assert = require('assert');
const should = require('chai').should();

describe('Basic Mocha String Test', function () {
    it('should return number of charachters in a string', function () {
        assert.equal('Hello'.length, 5);
    });
    
    it('should return first charachter of the string', function () {
        assert.equal('Hello'.charAt(0), 'H');
    });
    
    it('should have property name with value Figo', function(){
        var car = {name:'Figo', Maker:'Ford'};
        car.should.have.property('name').equal('Figo');
    });
    
    it('Checking for null', function(){
        var car = null;
        //car.should.not.exist; (Cannot read property 'should' of null)
        should.not.exist(car);
    });
});