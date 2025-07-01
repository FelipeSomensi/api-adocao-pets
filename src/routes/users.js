const express = require("express");
const router = express.Router();
//Importa o middleware que valida tokens JWT em rotas protegidas
const { authenticateToken, authorizeRole, authorizeSelfOrAdmin } = require('../middlewares/auth.middleware');
const UserController = require("../controllers/userController");

// Lista todos os usuários
router.get("/", authenticateToken, authorizeRole('admin'), UserController.listar);

// Busca usuário por ID
router.get("/:id", authenticateToken, authorizeSelfOrAdmin, UserController.buscarPorId);

// Adiciona um novo usuário
router.post("/", UserController.register);

// Atualiza usuário por ID
router.put("/:id", authenticateToken, authorizeSelfOrAdmin, UserController.atualizar);

// Deleta usuário por ID
router.delete("/:id", authenticateToken, authorizeRole('admin'), UserController.deletar);

router.post("/login" , UserController.login);

module.exports = router;