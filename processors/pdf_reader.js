const pdfURL = require("./html_parser");
const pdfParse = require("./../lib/interactors/pdf_parser");
const crawler = require("crawler-request");

const cantineUrl = "https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689";
    
async function pdfParsing() {
    let urls = await pdfURL.getURLs(cantineUrl);
    urls.forEach(elem => {
        crawler(elem).then(function(response){
            if(!response.error && response.status === 200) {//TODO: Check which sort of menu it is and act accordingly
                pdfParse.newReadMeals(response);
            }
            else {
                console.log("error in url: ", response.url);
            }
        });
    });
}

pdfParsing();