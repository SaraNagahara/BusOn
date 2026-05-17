const crypto = require("crypto");

// gerar PIN de 5 dígitos
function generatePin() {
  return crypto.randomInt(10000, 100000).toString();
}

// hash do PIN
function hashPin(pin) {
  return crypto
    .createHash("sha256")
    .update(pin)
    .digest("hex");
}

module.exports = {generatePin, hashPin}