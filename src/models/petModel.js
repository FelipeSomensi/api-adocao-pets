const connection = require("../config/db");

exports.buscarTodos = (callback) => {
    connection.query("SELECT * FROM tapet", callback);
};