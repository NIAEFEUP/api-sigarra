var request = require("request");
var cheerio = require("cheerio");
/*
Cantines to Remove: 
 - Grill Engenharia
 - Cantina de Ciencias
 - Cantina de Letras
 - Cantina de Belas Artes
 - Cantina de Vairão
*/
function getPDF(url){
    var pdfLinks = []
    request(url, (error, response, html)=>{
        if(!error && response.statusCode == 200){
            const $ = cheerio.load(html);
            $('div.mobile').find('a').each(function(i, elem){
                var cantine = $(this).html();
                if (
                    cantine != "Grill de Engenharia" &&
                    cantine != "Cantina de Ci&#xFFFD;ncias" &&
                    cantine != "Cantina de Letras" &&
                    cantine != "Cantina de Belas Artes" &&
                    cantine != "Cantina de Vair&#xFFFD;o"
                )
                {
                    pdfLinks.push($(this).attr("href"));
                }
                
            });
        }
        // console.log(pdfLinks);
        console.log("lel");
        return pdfLinks;
    });
}

async function test() {
    console.log("Hello")
    var pdfs = await getPDF("https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689");
    console.log("Its me");
}

test();