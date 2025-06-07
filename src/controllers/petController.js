const petModel = require("../models/petModel");

exports.listar = (req, res) => {
    petModel.buscarTodos((err, results) => {
        if (err) return res.status(500).send("Erro ao listar pets");
        res.json(results);
    }); // Retorna os pets como JSON
};