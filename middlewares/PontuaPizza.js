// Todo Middlleware recebe necessariamente 3 parâmetros => req, res, next 
// Middleware é uma função que verifica uma determinada solicitação.
const pizzas = require('../database/pizzas.json');
const fs = require('fs');
const path = require('path');

function PontuaPizza(req, res, next) {
    //Capturar o id da pizza requerida
    const id = req.params.id
    let pizza = pizzas.find(p => p.id == id);
    //Verificando a existência da pizza
    if (!pizza) {
        res.send("Pizza não encontrada!");
        return;
    };
    //Levantar a pontuação da pizza de um arquivo e aumentar +1;
    if (pizza.score == undefined) {
        pizza.score = 1;
    } else {
        pizza.score++;
    };
    //Salvar a nova pontuação
    const filepath = path.resolve('./database/pizzas.json');
    fs.writeFileSync(filepath, JSON.stringify(pizzas, null, 4));
    //Passar para o próximo middleware
    next();
}

module.exports = PontuaPizza;

