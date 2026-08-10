const User = require("./User");
const Itinerario = require("./Bus_schedules");
const UserFavoriteRoute = require("./UserFavoriteRoute");
const PasswordReset = require("./PasswordReset");

// UserFavoriteRoute → User
UserFavoriteRoute.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// UserFavoriteRoute → Itinerario
UserFavoriteRoute.belongsTo(Itinerario, {
  foreignKey: "itinerario_id",
  as: "itinerario",
});

// User → favoritos
User.hasMany(UserFavoriteRoute, {
  foreignKey: "user_id",
  as: "favoriteRoutes",
});

// User ↔ Itinerario
User.belongsToMany(Itinerario, {
  through: UserFavoriteRoute,
  foreignKey: "user_id",
  otherKey: "itinerario_id",
  as: "favoriteItinerarios",
});

// Itinerario → favoritos
Itinerario.hasMany(UserFavoriteRoute, {
  foreignKey: "itinerario_id",
  as: "favoritedByUsers",
});

// Itinerario ↔ User
Itinerario.belongsToMany(User, {
  through: UserFavoriteRoute,
  foreignKey: "itinerario_id",
  otherKey: "user_id",
  as: "favoritedBy",
});

// PasswordReset → User
PasswordReset.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// User → PasswordReset
User.hasMany(PasswordReset, {
  foreignKey: "user_id",
  as: "passwordResets",
});

module.exports = {
  User,
  Itinerario,
  UserFavoriteRoute,
  PasswordReset,
};