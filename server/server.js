require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const dbconnection = require("./database");
const path = require("path");

// Routes imports

const authenticationRoutes = require("./routes/authenticationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const currentTypeRoutes = require("./routes/typeRoutes");
const accessKeyRoutes = require("./routes/acessKeyRoutes");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN_NAME,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Routes
app.use("/api/authentication", authenticationRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/accessKeys",accessKeyRoutes);
// Database connection
dbconnection();

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
