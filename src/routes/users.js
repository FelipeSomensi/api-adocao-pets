const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rota GET /pet - lista todos os user
router.get("/", userController.listar);

// Busca usuário por ID (GET /users/:id)
router.get("/:id", userController.buscarPorId);

// Atualiza usuário por ID (PUT /users/:id)
router.put("/:id", userController.atualizar);

// Deleta usuário por ID (DELETE /users/:id)
router.delete("/:id", userController.deletar);

// Rota POST /pets - adiciona um novo pet
router.post("/", userController.adicionar);

module.exports = router;