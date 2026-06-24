require('dotenv').config();
const app = require("./src/app");
const db = require("./src/db/conn");
const User = require("./src/models/User");
const Bus_schedules = require("./src/models/Bus_schedules");
const PasswordReset = require("./src/models/PasswordReset");

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
// Criar e ajustar as tabelas do 0, cuidado com isso prq ele apaga todos dados, em produção iremos tirar.
// db.sync({ alter: true }) 
//   .then();

// deixa isso apenas por garantia se o .env n rodar
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});