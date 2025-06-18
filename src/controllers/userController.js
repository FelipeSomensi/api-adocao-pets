const userModel = require("../models/userModel");

exports.listar = (req, res) => {
  userModel.buscarTodos((err, results) => {
    if (err) return res.status(500).send("Erro ao listar usuarios");
    res.json(results);
  }); // Retorna os usuarios como JSON
};

// Buscar usuário pelo ID
exports.buscarPorId = (req, res) => {
  const id = req.params.id;
  userModel.buscarPorId(id, (err, results) => {
    if (err) return res.status(500).send("Erro ao buscar usuário");
    if (results.length === 0)
      return res.status(404).send("Usuário não encontrado");
    res.json(results[0]); // Retorna o primeiro (único) usuário encontrado
  });
};

// Adiciona um novo user após validar os campos
exports.adicionar = (req, res) => {
  const { name, email, phone, role, password } = req.body;

  if (!name || !email || !phone || !role || !password) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  userModel.inserir(req.body, (err) => {
    if (err) return res.status(500).send("Erro ao adicionar user.");
    res.status(201).send("User adicionado com sucesso.");
  });
};


// Atualizar usuário pelo ID
exports.atualizar = (req, res) => {
  const id = req.params.id;
  const { name, email, phone, role } = req.body;
  userModel.atualizar(id, { name, email, phone, role }, (err, results) => {
    if (err) return res.status(500).send("Erro ao atualizar usuário");
    if (results.affectedRows === 0)
      return res.status(404).send("Usuário não encontrado para atualizar");
    res.send("Usuário atualizado com sucesso");
  });
};

// Deletar usuário pelo ID
exports.deletar = (req, res) => {
  const id = req.params.id;
  userModel.deletar(id, (err, results) => {
    if (err) return res.status(500).send("Erro ao deletar usuário");
    if (results.affectedRows === 0)
      return res.status(404).send("Usuário não encontrado para deletar");
    res.send("Usuário deletado com sucesso");
  });
};
