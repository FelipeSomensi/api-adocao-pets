const connection = require("../config/db");

exports.buscarTodos = (callback) => {
    connection.query("SELECT * FROM pets", callback);
};

exports.buscarTodosDisponiveis = (callback) => {
    connection.query("Select * from pets where status = 'available';", callback);
};