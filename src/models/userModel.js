const db = require("../config/db");

class UserModel {
  // Retorna todos os users
  static buscarTodos(callback) {
    db.query("SELECT * FROM users", callback);
  }

  // Retorna user com base no ID
  static buscarPorId(id, callback) {
    const sql = "SELECT id, name, email, phone, role FROM users WHERE id = ?";
    db.query(sql, [id], callback);
  }

  // Retorna user com base no email
 static buscarPorEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, name, email, phone, role, password FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]); // Retorna o primeiro usuário encontrado ou undefined
    });
  });
}

  // Insere um novo user (usando callback tradicional)
static inserir(dados) {
  return new Promise((resolve, reject) => {
    const { name, email, phone, role, password } = dados;
    const sql = `
      INSERT INTO users (name, email, phone, role, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, email, phone, role, password], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
}

  // Atualiza um user existente com base no ID
  static atualizar(id, { name, email, phone, role }, callback) {
    const sql = "UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?";
    db.query(sql, [name, email, phone, role, id], callback);
  }

  // Exclui um user com base no ID
  static deletar(id, callback) {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], callback);
  }
}

module.exports = UserModel;