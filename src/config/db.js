const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "admin01", 
    database: "pets_db",
    port: 3307 // 👈 Adicionada a porta correta
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar:", err);
        return;
    }
    console.log("Conectado ao banco de dados com sucesso!");
});

module.exports = connection;