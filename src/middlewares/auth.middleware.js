const jwt = require("jsonwebtoken");
// Importa a biblioteca JWT para verificar e decodificar tokens de autenticação
// Middleware para autenticar o token JWT enviado pelo cliente
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("Conteúdo do token decodificado:", user); // 🔍 Veja aqui
    req.user = user;
    next();
  });
}

// Middleware para autorizar o acesso com base na função (role) do usuário
function authorizeRole(role) {
  return (req, res, next) => {
    // Verifica se o usuário possui a role exigida
    if (req.user.role !== role) {
      // Se não tiver permissão, retorna status 403 (Acesso negado)
      return res.status(403).json({ message: "Acesso negado" });
    }
    // Se autorizado, continua para a próxima função ou rota
    next();
  };
}

// Middleware para permitir acesso se for admin ou o próprio usuário
function authorizeSelfOrAdmin(req, res, next) {
  const loggedUser = req.user;
  const requestedId = parseInt(req.params.id);

  // Admin tem acesso a qualquer ID
  if (loggedUser.role === "admin") return next();

  // O próprio usuário também pode acessar seus dados
  if (loggedUser.id === requestedId) return next();

  // Qualquer outro caso: negado
  return res.status(403).json({ message: "Acesso negado" });
}

module.exports = {
  authenticateToken,
  authorizeRole,
  authorizeSelfOrAdmin,
};