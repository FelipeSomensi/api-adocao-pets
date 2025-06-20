const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Simulação de autenticação (ideal: validar no banco)
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // Aqui você deve validar com o banco de dados
  if (email === "admin@email.com" && senha === "123") {
    const user = {
      email,
      role: "admin"
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
});

module.exports = router;