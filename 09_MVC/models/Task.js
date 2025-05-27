const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Task = db.define("tasks", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  done: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Task;
