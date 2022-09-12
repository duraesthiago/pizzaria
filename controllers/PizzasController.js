// Importando o array de pizzas
const pizzas = require('../database/pizzas.json');

// Criando e exportando o objeto literal que conterá todas as funções (controllers)
module.exports = {

    index: (req, res) => {
        res.render('index.ejs', { pizzas });
    },

    show: (req, res) => {
        let setaVoltar = 0;
        let setaAvancar = 0;
        let idsPizzas = pizzas.map(pizza => pizza.id).sort((a, b) => a - b);
        console.log(idsPizzas)
        let idPrimeiraPizza = idsPizzas[0];
        let idUltimaPizza = idsPizzas[idsPizzas.length - 1];
        let id = Number(req.params.id);
        if (id === idPrimeiraPizza) {
            setaVoltar = idUltimaPizza;
            setaAvancar = id + 1;
        } else if (id === idUltimaPizza) {
            setaAvancar = idPrimeiraPizza;
            setaVoltar = id - 1
        } else {
            setaVoltar = id - 1;
            setaAvancar = id + 1;
        }
        console.log(setaAvancar, setaVoltar);
        const pizza = pizzas.find(p => p.id == id)
        res.render('pizza.ejs', { pizza, setaVoltar, setaAvancar });
    },

    search: (req, res) => {
        let termoBuscado = req.query.q
        const pizzaSearch = pizzas.filter(p => p.nome.toLowerCase().includes(termoBuscado.toLowerCase()));
        res.render('index.ejs', { pizzas: pizzaSearch });
    },
    addcart: (req, res) => {
        let test = req.body.id;
        res.send(test);
    }
}


