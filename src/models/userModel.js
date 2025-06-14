const connection = require("../config/db");

// Retorna todos os users
exports.buscarTodos = (callback) => {
  connection.query("SELECT * FROM users", callback);
};

// Retorna user com base no ID
exports.buscarPorId = (id, callback) => {
  const sql = "SELECT id, name, email, phone, role FROM users WHERE id = ?";
  connection.query(sql, [id], callback);
};

// Insere um novo user  //Verificar problema
exports.inserir = (dados, callback) => {
  const { name, email, phone, role } = dados;
  const sql = `
        INSERT INTO pets (name, email, phone, role) 
        VALUES (?, ?, ?, ?)
    `;
  connection.query(
    sql,
    [name, email, phone, role],
    callback
  );
};

// Atualiza um user existente com base no ID
exports.atualizar = (id, { name, email, phone, role }, callback) => {
  const sql =
    "UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?";
  connection.query(sql, [name, email, phone, role, id], callback);
};

// Exclui um user com base no ID
exports.deletar = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";
  connection.query(sql, [id], callback);
};
