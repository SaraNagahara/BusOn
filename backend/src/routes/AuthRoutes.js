const router = require("express").Router();

const AuthController = require("../controllers/AuthController");

const {
  sensitiveLimiter
} = require("../middlewares/rateLimiter");

const VerifyToken =
  require("../middlewares/virifyToken");


// =========================================================
// CADASTRO
// =========================================================

router.post(
  "/register",
  AuthController.register
);


// =========================================================
// LOGIN
// =========================================================

router.post(
  "/login",
  sensitiveLimiter,
  AuthController.login
);


// =========================================================
// LOGOUT
// =========================================================

router.post(
  "/logout",
  AuthController.logout
);


// =========================================================
// RECUPERAÇÃO DE SENHA
// =========================================================

router.post(
  "/forgot-password",
  sensitiveLimiter,
  AuthController.forgotPassword
);

router.post(
  "/verify-pin",
  sensitiveLimiter,
  AuthController.verifyPin
);

router.post(
  "/reset-password",
  sensitiveLimiter,
  AuthController.resetPassword
);


// =========================================================
// USUÁRIO AUTENTICADO
// =========================================================

router.get(
  "/me",
  VerifyToken,
  AuthController.me
);


module.exports = router;
