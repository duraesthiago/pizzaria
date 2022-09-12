// Escrever uma função Middleware que registre no arquivo acessos.txt o horário em que cada requisição é recebida pelo servidor.
// Formato da hora: AAAA-MM-DD HH:mm:sss
const fs = require('fs');
const path = require('path');

function RegistraHora(req, res, next) {
    let horaAcessada = new Date().toISOString().substring(0, 19).replace('T', ' ');
    const filepath = path.resolve(`./logs/${horaAcessada.substring(0, 10)}-acessos.txt`);
    fs.appendFileSync(filepath, `${horaAcessada} - ${req.url}` + "\n");
    next();
}

module.exports = RegistraHora;
