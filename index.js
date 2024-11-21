let express = require('express');
let app = express();

const port = 3000;

const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');

const cors = require('cors');


app.use(express.json());
app.use(cors());

sequelize.sync({ alter: true })
    .then(() => {
        console.log("sync feito com sucesso");
    })
    .catch(error => { console.log("deu erro!")
});

// Rota que recupera todos os usuários do sistema
app.get('/usuarios', async (req, res) => {
    
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


// Rota que recupera um usuário específico
app.get('/usuario/:id_usuario', async (req, res) => {
    const id_usuario = req.params.id_usuario;

    const usuario = await Usuario.findAll({
        where: {
            id_usuario: id_usuario
        }
    });

    res.json(usuario);

});


// Rota que adiciona um usuário
app.post('/usuario', async (req, res) => {
    
    const usuario = await Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        login: req.body.login
    });


    res.json(usuario);
});


// Rota que atualiza um usuário
app.put('/usuario/:id_usuario', async (req, res) => {

    // 1 - recupera o usuário de id "id_usuario" (busca no bd)
    const usuario = await Usuario.findByPk(req.params.id_usuario);

    // 2 - atualizar a instância do usuário
    const usuarioAtualizado = await usuario.update({        
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        login: req.body.login
    });

    res.json(usuarioAtualizado);
});


// Rota que deleta um usuário específico
app.delete('/usuario/:id_usuario', (req, res) => {

    // 1 - procure o usuário pela chave primária (req.params.id_usuario) (findByPk)
    // 2 - remova a instância retornada pela busca com a chave primária (método destroy())
    // 3 - retorne um texto para o usuário com sucesso ou fracasso

});


app.listen(port, () => {
    console.log(`servidor escutando a porta ${port}`);
});