const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemysql", "root", "admin@01", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (err) {
  console.log("Unable to connect to the database:", err.message);
}

module.exports = sequelize;
