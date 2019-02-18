const htmlparser = require("htmlparser2");
const request = require('request');
const pdf = require("pdf-parse");

let inside_cantinas = false
let cantinas_ref_count = 0
let getting_pdf = false

let urls = []

let parser = new htmlparser.Parser({
	onopentag: function(name, attribs){

		if (inside_cantinas){
			cantinas_ref_count += 1
		}

		if (getting_pdf){
			if (name == 'object' && attribs.hasOwnProperty('data')){
				urls.push(attribs['data']);
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

function handle_old_format(data) {
    let local = data.text.match(/(((CANTINA)|(SNACK-BAR)|(RESTAURANTE)) [A-Z .Ã]+)|(LETRAS CAFÉ)/)[0];

    data.text_per_page.forEach( (text) => {
        let ementa = text.match(/Componente .*\n.+ \n(?: ?\d .*\n.*\n)+(?:.\n)*(?:[/\-()aA-zZ](?:.)*\n)*/);
		if(ementa == null) ementa = text.match(/Componente .*\n.+ \n(?: ?[0-9]{1,2} .*\n.*\n)+(?:.\n)*(?:[/\-()aA-zZ](?:.)*\n)*/);
        if(ementa !== null){
            ementa = ementa[0];
            let start_sopa = ementa.lastIndexOf('SOPA');
            let start_carne = ementa.lastIndexOf('CARNE');
            if(start_sopa == -1 || start_carne == -1){
                //Ementa so com prato do dia e pratos permanentes

                let start_diario = ementa.lastIndexOf('Prato do dia');
                let start_permanente = ementa.lastIndexOf('Pratos \npermanentes');
				//Caso especial com dois espacos
				if(start_permanente == -1) start_permanente = ementa.lastIndexOf('Pratos  \npermanentes');

                if (start_diario == -1 || start_permanente == -1){
                    throw start_diario + ' we fucked x2 ' + start_permanente;
				}

                console.log('top');

            }
            else console.log(ementa.substring(start_sopa, start_carne));

        }
        else{
			console.log(text);
            throw 'we fucked';
		}
    });

    //console.log(Buffer.from(data.text_per_page[0], 'utf8').toString('hex'));

}

function handle_pdf(data) {
    //Takes blue pill or red pill not both
    let is_old_format = data.text.match('Os pratos constantes na ementa poderão possuir ou conter vestígios dos alergénios abaixo indicados:');
    let is_new_format = data.text.match('A sua refeição contém ou pode conter as seguintes substâncias ou produtos e seus derivados');

    if(is_old_format !== is_new_format){
        if (is_old_format == null){
            console.log('new format');
        }
        else handle_old_format(data);
    }
    else{
        if(is_old_format == undefined) console.log('terceiro formato xpto');
        else throw ('WHAT THE FUCK');
    }
}

function process_url(element) {
    let request_settings = {
        method: 'GET',
        url: element,
        encoding: null
    };
    request(request_settings, async function tmp(error, response, body) {
        //console.log(element);
        let data = await pdf(body, {version : 'v2.0.550'});
        handle_pdf(data);
    });
}

request('https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689', (error, response, body) =>
	{
		parser.write(body);
		parser.end();
        urls.forEach((element) => {process_url(element)});
	});
