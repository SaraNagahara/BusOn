const jwt = require("jsonwebtoken");
const getToken = require("./getToken");

const checkToken = (req, res, next) => {
  const token = getToken(req);

  // Verifica se o token existe
  if (!token) {
    return res.status(401).json({
      message: "Acesso negado!",
    });
  }

  try {
    // Verifica se o token é válido
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Adiciona os dados do usuário na requisição
    req.user = verified;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
};

module.exports = checkToken;