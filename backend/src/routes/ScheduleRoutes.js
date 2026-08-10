const router = require("express").Router();
const ScheduleController = require("../controllers/ScheduleController");
const { generalLimiter } = require("../middlewares/rateLimiter");

// Middleware
// const VerifyToken = require("../middlewares/virifyToken"); 

router.get(
  "/router/:title",
  generalLimiter,
  ScheduleController.GetSchedule
);

router.get(
  "/search",
  generalLimiter,
  ScheduleController.SearchRouter
);

module.exports = router;