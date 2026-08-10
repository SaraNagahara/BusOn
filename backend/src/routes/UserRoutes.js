const router = require("express").Router();

const UserController =
  require("../controllers/UserController");

const VerifyToken =
  require("../middlewares/virifyToken");

const {
  sensitiveLimiter
} = require("../middlewares/rateLimiter");


// =========================================================
// ALTERAR SENHA
// =========================================================

router.put(
  "/changePassword",
  VerifyToken,
  sensitiveLimiter,
  UserController.changeUserPassword
);


// =========================================================
// ALTERAR EMAIL
// =========================================================

router.put(
  "/changeEmail",
  VerifyToken,
  sensitiveLimiter,
  UserController.changeUserEmail
);


// =========================================================
// EXCLUIR CONTA
// =========================================================

router.delete(
  "/delete",
  VerifyToken,
  sensitiveLimiter,
  UserController.DeleteUserByID
);


module.exports = router;