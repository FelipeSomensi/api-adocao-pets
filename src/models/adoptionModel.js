const db = require("../config/db");

class AdoptionModel {
  // Retorna todos os users
  static buscarTodos(callback) {
    db.query("SELECT * FROM adoptions", callback);
  }

  // Realiza adoção
  static inserirAdocao(userId, petId, adoptionDate, callback) {
    db.query(
      "INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)",
      [userId, petId, adoptionDate],
      callback
    );
  }

  static atualizarStatusPet(petId, callback) {
    db.query("UPDATE pets SET status = 'adopted' WHERE id = ?", [petId], callback);
  }

  static buscarPetPorId(petId, callback) {
    db.query("SELECT * FROM pets WHERE id = ?", [petId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
}

module.exports = AdoptionModel;
