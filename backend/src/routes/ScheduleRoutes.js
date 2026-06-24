
const router = require("express").Router();
const ScheduleController = require("../controllers/ScheduleController");


//Middleware
const VerifyToken = require("../middlewares/virifyToken");

router.get("/router/:title", ScheduleController.GetSchedule)
router.get("/search", ScheduleController.SearchRouter)


module.exports = router;