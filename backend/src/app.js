
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// Config JSON Response
app.use(express.json());

// Cookies
app.use(cookieParser());

// CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Pasta para imagens
app.use(express.static(path.join(__dirname, "../public")));

// Routes
const UserRoutes = require("./routes/UserRoutes");
const ScheduleRoutes = require("./routes/ScheduleRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const FavoriteRoutes = require("./routes/FavoriteRoutes");
const AdminRoutes = require("./routes/AdminRoutes");

app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/schedules", ScheduleRoutes);
app.use("/favorite-routes", FavoriteRoutes);
app.use("/admin", AdminRoutes);

module.exports = app;
