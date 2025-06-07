// Importa o framework Express, responsável por criar o servidor e gerenciar as rotas
const express = require("express");
// Inicializa o aplicativo Express
const app = express();
// Importa as rotas do módulo de jogos
const petRoutes = require("./routes/pets");
// Middleware do Express para permitir o uso de JSON no corpo das requisições (body-parser embutido)
app.use(express.json());
// Exemplo: GET /pets, POST /pets
app.use("/pets", petRoutes);
// Quando estiver rodando, exibe uma mensagem no terminal
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});