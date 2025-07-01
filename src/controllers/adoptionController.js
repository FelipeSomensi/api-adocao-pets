const adoptionModel = require("../models/adoptionModel");

class AdoptionController {
  static listar(req, res) {
    adoptionModel.buscarTodos((err, results) => {
      if (err) return res.status(500).send("Erro ao listar adoções");
      res.json(results);
    });
  }

  static realizarAdocao(req, res) {
    const { userId, petId } = req.body;

    if (!userId || !petId) {
      return res.status(400).send("userId e petId são obrigatórios");
    }

    // Busca o pet e valida o status
    adoptionModel.buscarPetPorId(petId, (err, pet) => {
      if (err) return res.status(500).send("Erro ao buscar pet");
      if (!pet) return res.status(404).send("Pet não encontrado");
      if (pet.status !== "available") return res.status(400).send("Pet não está disponível para adoção");

      const dataAtual = new Date();

      // Insere a adoção
      adoptionModel.inserirAdocao(userId, petId, dataAtual, (err) => {
        if (err) return res.status(500).send("Erro ao registrar adoção");

        // Atualiza status do pet
        adoptionModel.atualizarStatusPet(petId, (err) => {
          if (err) return res.status(500).send("Adoção registrada, mas falha ao atualizar status do pet");
          res.send("Adoção realizada com sucesso");
        });
      });
    });
  }
}

module.exports = AdoptionController;