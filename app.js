// Importando o express
const express = require('express');
const RegistraHora = require('./middlewares/RegistraHoraDeAcesso');
const session = require('express-session');

// Criando a aplicação express
const app = express();

// Configurando express para trabalhar com o EJS como view engine
app.set('view engine', 'ejs');


// Definindo rotas para arquivos estáticos
app.use( // Definição que configura o cookie da session
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // 'true' para quando a conexão for HTTPS
    })
)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(RegistraHora);



// Importando o roteador que lida com as rotas de pizza
const PizzasRouter = require('./routes/PizzasRouter');
//const UsuariosController = require('./routes/UsuariosRouter');

// Fazendo com que a aplicação utilize o roteador para todas as req que chegarem para endereços que comecem com /pizzas
app.use('/pizzas', PizzasRouter);
//app.use('/usuarios', UsuariosController);

// Adicionando uma rota na aplicação que responde para usuário diretamente... (isso não é MVC, mas funciona)
app.get('/', (req, res) => { res.send("Olá, visitante") })

// Pondo a aplicação para rodar escutando na porta 3000
app.listen(3000, () => { console.log("Servidor rodando na porta 3000") });

