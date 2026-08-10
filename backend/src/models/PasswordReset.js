const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const PasswordReset = db.define(
  "PasswordReset",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: "users",
        key: "id",
      },

      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    pin_hash: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },

    reset_token: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "passwordResets",
    timestamps: true,

    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["reset_token"],
      },
      {
        fields: ["expires_at"],
      },
    ],
  }
);

module.exports = PasswordReset;