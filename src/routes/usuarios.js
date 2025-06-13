const express = require("express");
const router = express.Router();
const usuariotController = require("../controllers/usuarioController");

// Rota GET /pet - lista todos os pet
router.get("/", usuariotController.listar);

module.exports = router;