const jwt = require("jsonwebtoken");

const createUserToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = {
  createUserToken,
};