const User = require("../models/User");
const getToken = require("./getToken");
const jwt = require("jsonwebtoken");

const getUserByToken = async (req) => {
  const token = getToken(req);

  if (!token) {
    throw new Error("Token não informado");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findOne({
    where: {
      id: decoded.id
    }
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
};

module.exports = getUserByToken;