from html.parser import HTMLParser
import requests
from os import mkdir

class ParserCantinas(HTMLParser):
    '''

        Nota isto funciona um bocado com undefined behaviour,
        como ha cantinas que nao teem ementa porque a cantina se encontra fechada/em remodelacoes
        entao nao ha atributo object. Como nao ha object ele continua e prossegue para a parte
        do else, e se encontrar outra div com id entao passa a verificar essa. no biggie, atento
        Runcolho do futuro isto pode salvar tempinho valioso. Nao descomentar a linha do print(val)
        no else

    '''
    inside_cantinas = False
    cantinas_ref_count = 0
    getting_pdf = False
    lista_pdfs = []
    def handle_starttag(self, tag, attrs):

        if self.getting_pdf:
            self.cantinas_ref_count += 1
            if tag == 'object':
                for type_tag, val in attrs:
                    if type_tag == 'data':
                        print(val)
                        self.lista_pdfs.append(val)
                        self.getting_pdf = False
                        return
                raise ValueError('missing data attribute')


        if self.inside_cantinas is not True:
            if tag == 'div':
                for type_tag, val in attrs:
                    if type_tag == 'class' and val == 'cantinas':
                        self.inside_cantinas = True
                        self.cantinas_ref_count = 1
                        return
        else:
            self.cantinas_ref_count += 1
            if tag == 'div':
                for type_tag, val in attrs:
                    if type_tag == 'id':
                        #print(val)
                        self.getting_pdf = True
                        return

    def handle_endtag(self, tag):
        if self.inside_cantinas:
            self.cantinas_ref_count -= 1
            if self.cantinas_ref_count == 0:
                self.inside_cantinas = False
                if tag != 'div':
                    raise ValueError('should be a div')
                print('Saimos {}'.format(tag))

    def handle_data(self, data):
        pass

    def download_pdfs(self):
        try:
            mkdir('pdf')
        except FileExistsError:
            pass

        for link in self.lista_pdfs:
            result = requests.get(link).content
            file_name = link.split('/')[-1].replace('%20', '_').replace('%E3', 'a').replace('%EA', 'e')
            #file_name = link.split('/')[-1]
            #file_name = urllib.parse.unquote(file_name)
            with open('pdf/'+file_name, 'wb') as f:
                f.write(result)


parser = ParserCantinas()
parser.feed(requests.get('https://sigarra.up.pt/sasup/pt/web_base.gera_pagina?P_pagina=265689').text)
parser.download_pdfs()
