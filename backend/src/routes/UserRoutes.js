const router = require("express").Router();
const UserController = require("../controllers/UserController");
const ScheduleController = require("../controllers/ScheduleController");

//Middleware
const VerifyToken = require("../middlewares/virifyToken");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/forgotPassword", UserController.forgotPassword)
router.post("/verifyPin", UserController.verifyPin)
router.post("/delete", VerifyToken, UserController.DeleteUserByID);
router.post("/Logout", VerifyToken, UserController.logout)
router.get("/resetPassword", UserController.resetPassword)
router.get("/home", VerifyToken, UserController.homepage)

// Routes Update authenticated user data
router.post("/changePassowrd", VerifyToken, UserController.changeUserPassword)
router.post("/changeEmail", VerifyToken, UserController.changeUserEmail)
module.exports = router;