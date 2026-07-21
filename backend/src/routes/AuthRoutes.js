const router = require("express").Router();

const AuthController = require("../controllers/AuthController");

//Middleware
const VerifyToken = require("../middlewares/virifyToken");

// Públicas
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/verify-pin", AuthController.verifyPin);
router.post("/reset-password", AuthController.resetPassword);

// Privadas
router.post("/logout", VerifyToken, AuthController.logout);
router.get("/me", VerifyToken, AuthController.me);

module.exports = router;