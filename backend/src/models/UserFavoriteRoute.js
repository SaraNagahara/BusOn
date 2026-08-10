const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const UserFavoriteRoute = db.define(
  "UserFavoriteRoute",
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

    itinerario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "itinerarios",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_favorite_routes",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["user_id", "itinerario_id"],
      },
      {
        fields: ["user_id"],
      },
      {
        fields: ["itinerario_id"],
      },
    ],
  }
);

module.exports = UserFavoriteRoute;