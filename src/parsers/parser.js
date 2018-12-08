const fs = require('fs');
const pdf = require('pdf-parse');

class Meal{
    constructor(soup, meat_plate, fish_plate, veggie_plate)
    {
        this.soup = soup;
        this.meat_plate = meat_plate;
        this.fish_plate = fish_plate;
        this.veggie_plate = veggie_plate;
    }
    getSoup()
    {
        return this.soup;
    }
    getMeat()
    {
        return this.meat_plate;
    }
    getFish()
    {
        return this.fish_plate;
    }
    getVeggie()
    {
        return this.veggie_plate;
    }
}

class Menu{
    constructor(monday, tuesday, wednesday, thursday, friday)
    {
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
    }
}

function parseMeals(meals)
{
    const newline_regex = /\n/g;
    meals.forEach((meal, index)=>{
        meals[index] = meals[index].replace(/(?<!\s(à|a|ante|após|até|com|conforme|contra|consoante|de|desde|durante|em|excepto|entre|mediante|para|por|salvo|sem|segundo|sob|sobre|trás|c\/)) \n[A-Z]/g, "~$&");
        meals[index] = meals[index].replace(newline_regex, '');
        meals[index] = meals[index].split(/~ /g);
        meals[index].pop();
        meals[index].splice(0, 1);
        meals[index] = meals[index].map(meal => meal.trim());
    });
}

let buffer = fs.readFileSync('test.pdf');

pdf(buffer).then(function(data){
    let menu = data.text;
    let meals_regex = new RegExp("[A-Z]");
    let dates_regex = /Período:.* |PERIODO:.* /g;
    let soups_regex = /Sopa(.+?)Carne/gsm;
    let meats_regex = /Carne(.+?)Pescado/gsm;
    let fish_regex = /Pescado(.+?)Vegetariano/gsm;
    let veggie_regex = /Vegetariano(.+?)NOTAS/gsm;
    let newline_regex  = /\n/g
    let dates = menu.match(dates_regex);
    let soups = menu.match(soups_regex);
    parseMeals(soups);

    let meats = menu.match(meats_regex);
    parseMeals(meats);
    
    let fish = menu.match(fish_regex);
    parseMeals(fish);
    
    let veggie = menu.match(veggie_regex);
    parseMeals(veggie);


    console.log(dates);
});

/* 
var myRe = new RegExp("d(b+)d", "g");
var myArray = myRe.exec("cdbbdbsbz");
console.log(myArray[3]); */