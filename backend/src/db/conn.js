const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log, 
  }
);

// Teste de conexão
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao MySQL com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
}

connectDB();

module.exports = sequelize;