const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((requisicao, resposta) => {
    const file = requisicao.url === '/' ? 'index.html' : requisicao.url;
    const filePath =  path.join(__dirname, 'publico', file);
    const extname = path.extname(filePath);
    
    const allowedFileTypes = ['.html', '.css', '.js'];
    const allowed = allowedFileTypes.find(item =>  item == extname);

    if(!allowed) return;


    fs.readFile(
        filePath, 
        (erro, conteudo) => {
            if(erro) throw erro;

            resposta.end(conteudo);
        }
    );

}).listen(5000, () => console.log('Servidor está em execução'));
























