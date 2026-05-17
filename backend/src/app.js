const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Config JSON Response
app.use(express.json());

// salve CORS
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

// Pasta para imagens 
app.use(express.static(path.join(__dirname, "../public")));

// Routes
const UserRoutes = require("./routes/UserRoutes");

app.use("/users", UserRoutes);

module.exports = app;