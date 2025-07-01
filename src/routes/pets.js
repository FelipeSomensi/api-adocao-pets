const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");
//Importa o middleware que valida tokens JWT em rotas protegidas
const { authenticateToken, authorizeRole, authorizeSelfOrAdmin } = require('../middlewares/auth.middleware');


// Rota GET /pets - lista todos os pet
router.get("/", authenticateToken, authorizeRole('admin'), petController.listar);

// Rota GET /pets/available - lista todos os pet qaue não fora adotados
router.get("/available", petController.buscarTodosDisponiveis);

// Rota GET /pets/:id - busca jogo por ID
router.get("/:id", authenticateToken, authorizeRole('admin'), petController.buscarPorId);

// Rota POST /pets - adiciona um novo pet
router.post("/", authenticateToken, authorizeRole('admin'), petController.adicionar);

// Rota PUT /pets/:id - atualiza um pet existente
router.put("/:id", authenticateToken, authorizeRole('admin'), petController.atualizar);

// Rota DELETE /pets/:id - exclui um pet
router.delete("/:id", authenticateToken, authorizeRole('admin'), petController.deletar);

module.exports = router;