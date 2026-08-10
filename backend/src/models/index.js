// src/models/index.js

const db = require("../db/conn");

const User = require("./User");
const Itinerario = require("./Bus_schedules");
const UserFavoriteRoute = require("./UserFavoriteRoute");
const PasswordReset = require("./PasswordReset");

// Configura associações
require("./associations");

module.exports = {
  db,
  User,
  Itinerario,
  UserFavoriteRoute,
  PasswordReset,
};