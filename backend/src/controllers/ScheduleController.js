const Itinerario = require("../models/Bus_schedules");
const validator = require("validator");
const { createUserToken } = require("../services/authService");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generatePin, hashPin } = require("../validators/validators");




module.exports = class  ScheduleController{
static async GetSchedule(req,res){
  const horarios = await Itinerario.findAll({
    where: {
      titulo: req.params.title,
    },
    order: [["horario", "ASC"]],
  });

  res.json(horarios);
}

static async SearchRouter(req,res){
  const { Op } = require("sequelize");
  const linhas = await Itinerario.findAll({
    where: {
      titulo: {
        [Op.like]: `%${req.query.q}%`,
      },
    },
  });

  res.json(linhas);
}
};
