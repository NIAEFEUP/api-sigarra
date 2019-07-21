/* eslint-disable no-unused-vars */
console.log("Meias");
const pdf = require("pdf-parse");

function parseMeals(meals)
{
    const newline_regex = /\n/g;
    meals.forEach((meal, index)=>{
        meals[index] = meals[index].replace(/(?<!\s(à|a|ante|após|até|com|conforme|contra|consoante|de|desde|durante|em|excepto|entre|mediante|para|por|salvo|sem|segundo|sob|sobre|trás|c\/)) \n[A-Z]/g, "~$&");
        meals[index] = meals[index].replace(newline_regex, "");
        meals[index] = meals[index].split(/~ /g);
        meals[index].pop();
        meals[index].splice(0, 1);
        meals[index] = meals[index].map(meal => meal.trim());
    });
}


function newReadMeals(buffer)
{
    pdf(buffer).then(data =>  {
        let menu = data.text;
        let soups_regex = /Sopa(.+?)\n/gms;
        let meat_regex = /Carne(.+?)\n/gms;
        let fish_regex = /Pescado(.+?)\n/gms;
        let veggie_regex = /Vegetariana(.+?)\n/gms;
        let dates_regex = /\d+ a \d+ de (.+)/gms;
        let week_pages = menu.split(dates_regex);
        let dates = menu.match(dates_regex);
        // console.log( 5);
        for(let i = 1; i < week_pages.length; i++)
        {
            // console.log(week_pages[i]);
            let soups = week_pages[i].match(soups_regex);
            let meats = week_pages[i].match(meat_regex);
            let fish = week_pages[i].match(fish_regex);
            let veggie = week_pages[i].match(veggie_regex);
            for (let i = 0; i < veggie.length; i++)
            {
                soups[i] = soups[i].substr(soups[i].indexOf(" ") + 1);
                meats[i] = meats[i].substr(meats[i].indexOf(" ") + 1);
                fish[i] = fish[i].substr(fish[i].indexOf(" ") + 1);
                veggie[i] = veggie[i].substr(veggie[i].indexOf(" ") + 1);
            }
            
        }
        dates.forEach((date, index) => {
            dates[index] = date.trim();
            dates[index] = dates[index].split(/ a /g);
        });

    });
}
function oldReadMeals(buffer)
{
    pdf(buffer).then(function(data){
        let menu = data.text;
        // let meals_regex = new RegExp("[A-Z]");
        let dates_regex = /\d+ a \d+/g;
        let soups_regex = /Sopa(.+?)Carne/gsm;
        let meats_regex = /Carne(.+?)Pescado/gsm;
        let fish_regex = /Pescado(.+?)Vegetariano/gsm;
        let veggie_regex = /Vegetariano(.+?)NOTAS/gsm;
        // let newline_regex  = /\n/g;
        let dates = menu.match(dates_regex);
        let soups = menu.match(soups_regex);
        parseMeals(soups);
    
        let meats = menu.match(meats_regex);
        parseMeals(meats);
        
        let fish = menu.match(fish_regex);
        parseMeals(fish);
        
        let veggie = menu.match(veggie_regex);
        parseMeals(veggie);
    
        dates.forEach((date, index)=>{
            dates[index] = date.trim();
            dates[index] = dates[index].split(/ a /g);
        });
    
        console.log(dates);
        console.log(meats);
        console.log(fish);
        console.log(veggie);
    });
}

console.log("Meias");