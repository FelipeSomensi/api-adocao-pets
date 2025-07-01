const express = require("express");
const router = express.Router();
//Importa o middleware que valida tokens JWT em rotas protegidas
const { authenticateToken, authorizeRole, authorizeSelfOrAdmin } = require('../middlewares/auth.middleware');
const adoptionController = require("../controllers/adoptionController");

// Lista todos os usuários
router.get("/", authenticateToken, authorizeRole('admin'), adoptionController.listar);

router.post("/", authenticateToken, authorizeRole('admin'), adoptionController.realizarAdocao)

module.exports = router;