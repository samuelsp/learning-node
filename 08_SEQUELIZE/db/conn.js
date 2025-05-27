const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemysql", "root", "admin@01", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.log("Unable to connect to the database:", error.message);
}

module.exports = sequelize;
