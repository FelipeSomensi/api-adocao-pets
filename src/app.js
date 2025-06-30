// Importa o framework Express, responsável por criar o servidor e gerenciar as rotas
const express = require("express");
// Inicializa o aplicativo Express
const app = express();
// Importa as rotas do módulo de pets
const petRoutes = require("./routes/pets");
// Importa as rotas do módulo de usuários
const userRoutes = require("./routes/users");
// Middleware do Express para permitir o uso de JSON no corpo das requisições (body-parser embutido)
app.use(express.json());
// Define os endpoints
app.use("/pets", petRoutes);
app.use("/users", userRoutes);
// Exporta o app para que ele possa ser utilizado por outros arquivos
module.exports = app;