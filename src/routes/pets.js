const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

// Rota GET /pets - lista todos os pet
router.get("/", petController.listar);

// Rota GET /pets/available - lista todos os pet qaue não fora adotados
router.get("/available", petController.buscarTodosDisponiveis);

// Rota GET /pets/:id - busca jogo por ID
router.get("/:id", petController.buscarPorId);

// Rota POST /pets - adiciona um novo pet
router.post("/", petController.adicionar);

// Rota PUT /pets/:id - atualiza um pet existente
router.put("/:id", petController.atualizar);

// Rota DELETE /pets/:id - exclui um pet
router.delete("/:id", petController.deletar);

module.exports = router;