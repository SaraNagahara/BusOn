const Itinerario = require("../models/Bus_schedules");
const validator = require("validator");
const { createUserToken } = require("../services/authService");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generatePin, hashPin } = require("../validators/validators");




module.exports = class  ScheduleController{
static async GetSchedule(req,res){

 const { tipo } = req.query;

 const where = {
   titulo:req.params.title.toUpperCase()
 };

 if(tipo){
   where.tipo = tipo.toLowerCase();
 }


 const horarios = await Itinerario.findAll({
   where,
   order:[
     ["horario","ASC"]
   ]
 });


 const response = {
   id: horarios[0].id,
   numeroLinha: horarios[0].titulo,
   destino: horarios[0].destino,
   origem: horarios[0].origem,
   tipo: "urbanas",

   horarios: []
 };


 const grupos = {};


 horarios.forEach(item=>{

   if(!grupos[item.dias_semana]){
      grupos[item.dias_semana] = [];
   }


   grupos[item.dias_semana].push({

      hora:item.horario.substring(0,5),

      detalhe:item.via 
        ? "Via " + item.via 
        : "Direto",

      direcao:item.tipo === "ida"
        ? "origem"
        : "destino"

   });

 });


 response.horarios = grupos;


 return res.json(response);

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
