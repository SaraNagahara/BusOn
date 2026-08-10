
const crypto = require("crypto");


// =========================================================
// GERAR PIN
// =========================================================

const generatePin = () => {

  return crypto
    .randomInt(100000, 1000000)
    .toString();

};


// =========================================================
// HASH DO PIN
// =========================================================

const hashPin = (pin) => {

  return crypto
    .createHash("sha256")
    .update(pin)
    .digest("hex");

};


module.exports = {
  generatePin,
  hashPin,
};
