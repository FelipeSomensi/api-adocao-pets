const userModel = require("../models/userModel");
const UserService = require("../services/userService");

class UserController {
  // Método estático que trata o cadastro de um novo usuário
  static async register(req, res) {
    try {
      // Chama o serviço para registrar o usuário, passando os dados da requisição
      const result = await UserService.registerUser(req.body);
      // Retorna status 201 (Criado) com os dados retornados pelo serviço
      return res.status(201).json(result);
    } catch (error) {
      // Em caso de erro (ex: usuário já existe), retorna status 409 (Conflito) com a mensagem do erro
      return res.status(409).json({ message: error.message });
    }
  }

  // Método estático que trata o login do usuário
  static async login(req, res) {
    try {
      // Chama o serviço para autenticar o usuário, passando os dados da requisição
      const result = await UserService.loginUser(req.body);
      // Retorna status 200 (OK) com o token JWT
      return res.status(200).json(result);
    } catch (error) {
      // Define o status apropriado com base na mensagem de erro
      const status =
        error.message === "Usuário não encontrado" ||
        error.message === "Senha inválida"
          ? 401 // Não autorizado
          : 500; // Erro interno do servidor
      // Retorna o status definido com a mensagem do erro
      return res.status(status).json({ message: error.message });
    }
  }

  static listar(req, res) {
    userModel.buscarTodos((err, results) => {
      if (err) return res.status(500).send("Erro ao listar usuários");
      res.json(results);
    });
  }

  static buscarPorId(req, res) {
    const id = req.params.id;
    console.log("teste")
    userModel.buscarPorId(id, (err, results) => {
      if (err) return res.status(500).send("Erro ao buscar usuário");
      if (results.length === 0)
        return res.status(404).send("Usuário não encontrado");
      res.json(results[0]);
    });
  }

  static adicionar(req, res) {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
      return res.status(400).send("Todos os campos são obrigatórios.");
    }

    userModel.inserir(req.body, (err) => {
      if (err) return res.status(500).send("Erro ao adicionar user.");
      res.status(201).send("User adicionado com sucesso.");
    });
  }

  static atualizar(req, res) {
    const id = req.params.id;
    const { name, email, phone, role } = req.body;
    userModel.atualizar(id, { name, email, phone, role }, (err, results) => {
      if (err) return res.status(500).send("Erro ao atualizar usuário");
      if (results.affectedRows === 0)
        return res.status(404).send("Usuário não encontrado para atualizar");
      res.send("Usuário atualizado com sucesso");
    });
  }

  static deletar(req, res) {
    const id = req.params.id;
    userModel.deletar(id, (err, results) => {
      if (err) return res.status(500).send("Erro ao deletar usuário");
      if (results.affectedRows === 0)
        return res.status(404).send("Usuário não encontrado para deletar");
      res.send("Usuário deletado com sucesso");
    });
  }

   // Método estático que trata o login do usuário
  static async login(req, res) {
    try {
      // Chama o serviço para autenticar o usuário, passando os dados da requisição
      const result = await UserService.loginUser(req.body);
      // Retorna status 200 (OK) com o token JWT
      return res.status(200).json(result);
    } catch (error) {
      // Define o status apropriado com base na mensagem de erro
      const status =
        error.message === "Usuário não encontrado" ||
        error.message === "Senha inválida"
          ? 401 // Não autorizado
          : 500; // Erro interno do servidor
      // Retorna o status definido com a mensagem do erro
      return res.status(status).json({ message: error.message });
    }
  }

}

module.exports = UserController;
