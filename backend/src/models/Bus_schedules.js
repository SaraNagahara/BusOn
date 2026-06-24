const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Itinerario = db.define(
  "Itinerario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    origem: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    destino: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    tipo: {
      type: DataTypes.ENUM("ida", "volta"),
      allowNull: false,
    },

    horario: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    dias_semana: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    via: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    rota: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "itinerarios",
    timestamps: true, // cria createdAt e updatedAt automaticamente
    indexes: [
      {
        fields: ["titulo"],
      },
      {
        fields: ["horario"],
      },
      {
        fields: ["origem", "destino"],
      },
    ],
  },
);

module.exports = Itinerario;