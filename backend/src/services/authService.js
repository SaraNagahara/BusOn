const jwt = require("jsonwebtoken");

const createUserToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4h",
    }
  );
};

module.exports = {
  createUserToken,
};
