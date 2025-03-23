const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const User = db.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = User;
