const connection = require("../config/db");

// Retorna todos os petss
exports.buscarTodos = (callback) => {
  connection.query("SELECT * FROM pets", callback);
};

// Retorna todos os pets disponiveis
exports.buscarTodosDisponiveis = (callback) => {
  connection.query("Select * from pets where status = 'available';", callback);
};

// Retorna um pet específico pelo ID
exports.buscarPorId = (id, callback) => {
  connection.query("SELECT * FROM pets WHERE id = ?", [id], callback);
};

// Insere um novo pet
exports.inserir = (dados, callback) => {
  const { name, age, species, size, status, description } = dados;
  const sql = `
        INSERT INTO pets (name, age, species, size, status, description) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  connection.query(
    sql,
    [name, age, species, size, status, description],
    callback
  );
};

// Atualiza um pet existente com base no ID
exports.atualizar = (
  id,
  { name, age, species, size, status, description },
  callback
) => {
  const sql = `
        UPDATE pets 
        SET name = ?, age = ?, species = ?, size = ?, status = ?, description = ?
        WHERE id = ?
    `;
  connection.query(
    sql,
    [name, age, species, size, status, description, id],
    callback
  );
};

// Exclui um pet com base no ID
exports.deletar = (id, callback) => {
  const sql = "DELETE FROM pets WHERE id = ?";
  connection.query(sql, [id], callback);
};
