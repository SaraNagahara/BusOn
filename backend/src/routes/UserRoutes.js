const router = require("express").Router();
const UserController = require("../controllers/UserController");
const ScheduleController = require("../controllers/ScheduleController");

//Middleware
const VerifyToken = require("../middlewares/virifyToken");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/forgotPassword", UserController.forgotPassword)
router.post("/verifyPin", UserController.verifyPin)
router.get("/resetPassword", UserController.resetPassword)
router.get("/home", VerifyToken, UserController.homepage)

module.exports = router;