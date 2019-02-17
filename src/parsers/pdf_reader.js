const pdfURL = require("./html_parser");
const request = require("request");
const pdfParse = require("./pdf_parser");

const cantineUrl = "https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689";

request
    .get("https://sigarra.up.pt/sasup/pt/web_gessi_docs.download_file?p_name=F-104819490/EMENTA%20Engenharia%20fevereiro.pdf",
        (error, response, body) => {
            if(!error && response.statusCode == 200)
            {
                console.log(body);
            }
        });
    
async function pdfParsing() {
    let pdfs = await pdfURL.getPDF(cantineUrl);
    pdfParse.newReadMeals(pdfs[4]);
    // console.log(pdfs);
}

pdfParsing();