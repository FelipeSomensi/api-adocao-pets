const adoptionModel = require("../models/adoptionModel");
const userModel = require("../models/userModel");

class AdoptionController {
  // Método estático que trata o cadastro de um novo usuário

  static listar(req, res) {
    adoptionModel.buscarTodos((err, results) => {
      if (err) return res.status(500).send("Erro ao listar usuários");
      res.json(results);
    });
  }
}

module.exports = AdoptionController;
