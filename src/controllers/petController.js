const petModel = require("../models/petModel");

exports.listar = (req, res) => {
  petModel.buscarTodos((err, results) => {
    if (err) return res.status(500).send("Erro ao listar pets");
    res.json(results);
  }); // Retorna os pets como JSON
};

exports.buscarTodosDisponiveis = (req, res) => {
  petModel.buscarTodosDisponiveis((err, results) => {
    if (err) return res.status(500).send("Erro ao listar pets disponíveis");
    res.json(results);
  });
};

// Busca um pet pelo ID
exports.buscarPorId = (req, res) => {
  petModel.buscarPorId(req.params.id, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar pet");
    if (results.length === 0) return res.status(404).send("pet não encontrado");
    res.json(results[0]);
  });
};

// Adiciona um novo pet após validar os campos
exports.adicionar = (req, res) => {
  const { name, age, species, size, status, description } = req.body;

  if (!name || age == null || !species || !size || !status || !description) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  const tamanhosValidos = ["small", "medium", "large"];
  const statusValidos = ["available", "adopted"];

  if (!tamanhosValidos.includes(size)) {
    return res.status(400).send("Tamanho inválido.");
  }

  if (!statusValidos.includes(status)) {
    return res.status(400).send("Status inválido.");
  }

  petModel.inserir(req.body, (err) => {
    if (err) return res.status(500).send("Erro ao adicionar pet.");
    res.status(201).send("Pet adicionado com sucesso.");
  });
};

// Atualiza um pet existente
exports.atualizar = (req, res) => {
  const { name, age, species, size, status, description } = req.body;

  if (!name || age == null || !species || !size || !status || !description) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  const tamanhosValidos = ["small", "medium", "large"];
  const statusValidos = ["available", "adopted"];

  if (!tamanhosValidos.includes(size)) {
    return res.status(400).send("Tamanho inválido.");
  }

  if (!statusValidos.includes(status)) {
    return res.status(400).send("Status inválido.");
  }

  petModel.atualizar(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).send("Erro ao atualizar pet.");
    if (result.affectedRows === 0)
      return res.status(404).send("Pet não encontrado.");
    res.send("Pet atualizado com sucesso.");
  });
};

// Exclui um pet pelo ID
exports.deletar = (req, res) => {
  const id = req.params.id;

  // Primeiro, busca o pet pelo ID
  petModel.buscarPorId(id, (err, pet) => {
    if (err) return res.status(500).send("Erro ao buscar pet.");
    if (!pet) return res.status(404).send("Pet não encontrado.");

    // Verifica se o status é diferente de 'available'
    if (pet.status !== "available") {
      return res.status(400).send("Não é possível deletar um pet já adotado.");
    }

    // Se estiver disponível, executa o delete
    petModel.deletar(id, (err, result) => {
      if (err) return res.status(500).send("Erro ao deletar pet.");
      res.send("Pet deletado com sucesso.");
    });
  });
};
