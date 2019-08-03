const pdfURL = require("./html_parser");
const pdfParse = require("./../lib/interactors/pdf_parser");
const crawler = require("crawler-request");
const request = require("request-promise");
const fs = require("fs");
const pdf_extract = require("pdf-extract");

const cantineUrl = "https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689";
    
async function pdfParsing() {
    let urls = await pdfURL.getURLs(cantineUrl);

    let options = {
        type: 'ocr',
        ocr_flags: [
            '-psm 1',       // automatically detect page orientation
            'alphanumeric'  // only output ascii characters
          ]
    }

    for (let i = 0; i < urls.length; i++) {

        let filename = "/tmp/file" + (i+1).toString() + ".pdf"

        let elem = urls[i];
        let pdfContent = await request.get({
            uri: elem,
            encoding: null
        });

        try {
            if (fs.existsSync(filename)){
                fs.unlinkSync(filename);
            }
            fs.writeFileSync(filename, pdfContent, "binary");
        } catch(err) {
            console.log(err);
        }

        let processor = await pdf_extract(filename, options, function(err) {
            if (err) console.log(err);
        });

        processor.on('complete', function(data) {
            console.log("pdf data: ", data.text_pages);            
        });

        processor.on('error', function(err) {
            console.log(err);
        });


        // TODO ENSURE FILES ARE DELETED!!
        /*
        fs.unlink(filename, function(err) {
            if (err) console.log(err);
        });*/

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