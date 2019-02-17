const htmlparser = require("htmlparser2");
const request = require('request');

let inside_cantinas = false
let cantinas_ref_count = 0
let getting_pdf = false

var parser = new htmlparser.Parser({
	onopentag: function(name, attribs){

		if (inside_cantinas){
			cantinas_ref_count += 1
		}

		if (getting_pdf){
			if (name == 'object' && attribs.hasOwnProperty('data')){
				console.log(attribs['data']);
				getting_pdf = false;
			}
		}

		if (inside_cantinas == false){
			if (name == 'div' && attribs['class'] == 'cantinas'){
				inside_cantinas = true;
				cantinas_ref_count = 1;
				return;
			}
		}
		else{
			if(name == 'div'){
				if (attribs.hasOwnProperty('id')){
					//console.log(attribs['id']);
					getting_pdf = true;
				}

			}

		}
	},
	ontext: function(text){
	},
	onclosetag: function(tagname){
		if (inside_cantinas){
			cantinas_ref_count -= 1;

			if(cantinas_ref_count == 0){
				inside_cantinas = false;
			}
		}
	}
}, {decodeEntities: true});


request('https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689', (error, response, body) =>
	{
		parser.write(body);
		parser.end();
	});
