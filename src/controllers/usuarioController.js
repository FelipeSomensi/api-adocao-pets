const usuarioModel = require("../models/usuarioModel");

exports.listar = (req, res) => {
  usuarioModel.buscarTodos((err, results) => {
    if (err) return res.status(500).send("Erro ao listar usuarios");
    res.json(results);
  }); // Retorna os usuarios como JSON
};

