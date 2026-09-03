import 'dotenv/config';
import express from 'express';

import { pizzas } from "./cardapiopizza.js";

// - Inicializa o servidor
const app = express()
//definindo a porta que vai rodar o projeto - pega do .env
const port = process.env.PORT;

// - Define o tipo de arquivo como json
app.use(express.json())


// - criando um get 
// - req é a requisição
// - res é a resposta
app.get('/', (req, res) => {

//envio a resposta em formato JSON
  res.json({resposta: "Teste Json"});
});


app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});

app.get('/pizzas', (req, res) => {
    res.json(pizzas)
})

app.get('/pizzas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pizza = pizzas.find(p => p.id === id
    );

    if(!pizza){
        return res.status(404).json({error: "Pizza não cadastrada"})
    }

    res.json(pizza)
})