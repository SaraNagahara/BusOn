require("dotenv").config();

const app = require("./src/app");
const db = require("./src/db/conn");

// Carregar associações
require("./src/models/associations");

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);

// db.sync({ alter: true })
db.sync()
  .then(() => {
    console.log("✅ Banco sincronizado com sucesso!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao sincronizar banco:", error);
  });