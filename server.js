// Importa o framework Express, responsável por criar o servidor e gerenciar as rotas
const express = require("express");
// Inicializa o aplicativo Express
const app = express();
// Importa as rotas do módulo de pets
const petRoutes = require("./src/routes/pets");
// Importa as rotas do módulo de usuarios
const userRoutes = require("./src/routes/users");
// Middleware do Express para permitir o uso de JSON no corpo das requisições (body-parser embutido)
app.use(express.json());
// Exemplo: GET /pets, POST /pets
app.use("/pets", petRoutes);
// Exemplo: GET /users, POST /users
app.use("/users", userRoutes);
// Quando estiver rodando, exibe uma mensagem no terminal
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});