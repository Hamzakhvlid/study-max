const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyTokenMiddleware"); // Assuming you have authentication
const currentTypeController = require("../controller/currentTypeController");

// Current Type Routes
router.post(
  "/add",

 verifyToken,
currentTypeController.addCurrentType
);
router.get("/", currentTypeController.getCurrentTypes); // No need to verify token for fetching
router.delete(
  "/:id",

  verifyToken,
  currentTypeController.deleteCurrentType
);

module.exports = router;