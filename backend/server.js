require('dotenv').config();
const app = require("./src/app");
const db = require("./src/db/conn");
const User = require("./src/models/User");

// Criar e ajustar as tabelas do 0, cuidado com isso prq ele apaga todos dados, em produção iremos tirar.
// db.sync({ alter: true }) 
//   .then();

// deixa isso apenas por garantia se o .env n rodar
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});