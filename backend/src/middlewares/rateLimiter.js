
const rateLimit = require("express-rate-limit");


// =========================================================
// RATE LIMIT GERAL
// =========================================================

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    message:
      "Muitas requisições. Tente novamente mais tarde.",
  },
});


// =========================================================
// RATE LIMIT SENSÍVEL
// =========================================================

const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    message:
      "Muitas tentativas. Tente novamente mais tarde.",
  },
});


module.exports = {
  generalLimiter,
  sensitiveLimiter,
};
