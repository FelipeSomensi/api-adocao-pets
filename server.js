const express = require("express");
const app = express();
app.use(express.json());
app.get("/products", (req, res) => {
  res.json([{ id: 1, name: "Animal Exemplo" }]);
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
