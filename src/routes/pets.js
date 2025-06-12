const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

// Rota GET /pet - lista todos os pet
router.get("/", petController.listar);

router.get("/available", petController.buscarTodosDisponiveis);

module.exports = router;