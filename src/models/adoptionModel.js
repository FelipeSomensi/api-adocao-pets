const db = require("../config/db");

class AdoptionModel {
  // Retorna todos os users
  static buscarTodos(callback) {
    db.query("SELECT * FROM adoptions", callback);
  }
}
module.exports = AdoptionModel;
