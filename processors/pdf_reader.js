const pdfURL = require("./html_parser");
const pdfParse = require("./../lib/interactors/pdf_parser");
const crawler = require("crawler-request");
const request = require("request-promise");
const fs = require("fs");

const cantineUrl = "https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689";
    
async function pdfParsing() {
    let urls = await pdfURL.getURLs(cantineUrl);

    for (let i = 0; i < urls.length; i++) {

        let pdf_file = "file" + (i+1).toString() + ".pdf"

        let elem = urls[i];
        let pdfContent = await request.get({uri: elem});

        try {
            fs.writeFileSync(pdf_file, pdfContent);
        } catch(err) {
            console.log(err);
        }
        
        fs.readFile(pdf_file, function(err, data) {
            console.log("data: " , data);
            console.log("\n");
        });

        fs.unlink(pdf_file, function(err) {
            if (err) console.log(err);
        });

        /*
        crawler(elem).then(function(response){
            if(!response.error && response.status === 200) {//TODO: Check which sort of menu it is and act accordingly
                pdfParse.newReadMeals(response);
            }
            else {
                console.log("error in url: ", response.url);
            }
        });*/

    }
}

pdfParsing();