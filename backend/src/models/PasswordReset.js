const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const PasswordReset = db.define("PasswordReset", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  pin_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  reset_token: {
    type: DataTypes.STRING,
  },

  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

}, {
  tableName: "passwordResets",
  timestamps: true,
});

module.exports = PasswordReset;