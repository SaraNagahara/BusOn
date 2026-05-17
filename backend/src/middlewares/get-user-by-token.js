const getToken = require("./getToken");
const jwt = require("jsonwebtoken");

const getUserByToken = async (req, res) => {
  const token = getToken(req);

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id },
  });

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado",
    });
  }

  return user;

} catch (err) {
  return res.status(403).json({
    message: "Token inválido ou expirado",
  });
}
};
