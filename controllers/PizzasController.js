// Importando o array de pizzas
const pizzas = require('../database/pizzas.json');

// Criando e exportando o objeto literal que conterá todas as funções (controllers)
module.exports = {

    index: (req, res) => {
        res.render('index.ejs', { pizzas });
    },

    show: (req, res) => {
        let { id } = req.params;
        const pizza = pizzas.find(p => p.id == id)
        res.render('pizza.ejs', { pizza });
    },

    search: (req, res) => {
        let termoBuscado = req.query.q
        const pizzaSearch = pizzas.filter(p => p.nome.toLowerCase().includes(termoBuscado.toLowerCase()));
        res.render('index.ejs', { pizzas: pizzaSearch });
    }
}


