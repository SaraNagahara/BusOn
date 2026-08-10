const getToken = (req) => {
  const token = req.cookies.token;

  if (!token) return null;

  return token;
};

module.exports = getToken;