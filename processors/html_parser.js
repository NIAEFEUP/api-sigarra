var request = require("request-promise");
var cheerio = require("cheerio");

/*
Cantines to Remove: 
 - Cantina de Vairão
*/

module.exports = {
    getURLs: async function(uri) {
        var pdfLinks = [];
        const options = {
            uri,
            transform: body => {
                return cheerio.load(body);
            }
        };
        return request(options)
            .then($ => {
                $("div.mobile > ul.lista > li > a").each((i, elem) => {
                    const el = $(elem);
                    const cantine = el.text();
                    if (cantine != "Cantina de Vair&#xFFFD;o") {
                        pdfLinks.push(el.attr("href"));
                    }
                });
                pdfLinks.forEach((elem, i) => {
                    pdfLinks[i] = `https://sigarra.up.pt/sasup/pt/${elem}`;
                });
                return pdfLinks;
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    }
};