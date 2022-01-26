const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');

const data = require('./urls.json')

function writeFile(cb) {
    fs.writeFile(path.join(__dirname, "urls.json"), JSON.stringify(data, null, 2), erro => {
        if(erro) throw erro;

        cb(JSON.stringify({message: "Ok"}));
    });
}

http.createServer((requisicao, resposta) => {
   
    const {name, url, del} = URL.parse(requisicao, url, true).query;

    resposta.writeHead(200, { 'Access-Control-Allow-Origin': '*' });

    // Todos os recursos
    if(!name || !url){
        return resposta.end(JSON.stringify(data));
    }

    if(del){
        data.urls = data.urls.filter(item => String (item.url) !== String (url));
        return writeFile((message) => resposta.end(message));      
    }

    data.urls.push({name, url});

    return writeFile((message) => resposta.end(message));


}).listen(3000, () => console.log('API está em execução'));


























