const jwt = require("jsonwebtoken");
const getToken = require("./getToken");

const checkToken = (req, res, next) => {
  // camada de proteção extra
  if (req.header.authorization) {
    return res.status(401).json({
      message: "Acesso negado!",
    });
  }

  const token = getToken(req);

  // verificar se token existe!
  if (!token) {
    return res.status(401).json({
      message: "Acesso negado!",
    });
  }

  //
  try {
    // Verifica se o token é válido e decodifica os dados do usuario
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona os dados do usuário na requisição
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token Invalido",
    });
  }
};

module.exports = checkToken;