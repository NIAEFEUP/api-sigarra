var request = require("request-promise");
var cheerio = require("cheerio");
/*
Cantines to Remove: 
 - Grill Engenharia
 - Cantina de Ciencias
 - Cantina de Letras
 - Cantina de Belas Artes
 - Cantina de Vairão
 - Cantina de Engenharia
*/
async function getPDF(uri){
    var pdfLinks = []
    const options = {
        uri,
        transform: (body) => {
            return cheerio.load(body);
        }
    }
    return request(options)
        .then($ => {
            $('div.mobile > ul.lista > li > a').each((i, elem) => {
                const el = $(elem)
                const cantine = el.text();
                if (
                    cantine != "Grill de Engenharia" &&
                    cantine != "Cantina de Ci&#xFFFD;ncias" &&
                    cantine != "Cantina de Letras" &&
                    cantine != "Cantina de Belas Artes" &&
                    cantine != "Cantina de Vair&#xFFFD;o"
                ) {
                    pdfLinks.push(el.attr('href'));
                }
            });
            pdfLinks.forEach((elem, i) =>{
                console.log(i, elem);
                pdfLinks[i] = `https://sigarra.up.pt/sasup/pt/${elem}`
            });
            return pdfLinks;
        })
        .catch((err)=>{
            console.log(`Error: `, err);
        })
    
};

async function test() {
    console.log("Hello")
    var pdfs = await getPDF("https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689");
    console.log(pdfs);
    console.log("Its me");
}

test();