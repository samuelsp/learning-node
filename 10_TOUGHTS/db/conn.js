require("dotenv").config();

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_BASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

try {
  sequelize.authenticate();
  console.log("Conexão com o banco de dados realizada com sucesso!");
} catch (err) {
  console.error("Não foi possível conectar ao banco de dados:", err);
}

module.exports = sequelize;
