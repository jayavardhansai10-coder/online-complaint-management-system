const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  addFeedback,
  getFeedback,
} = require("../controllers/feedbackController");

router.post(
  "/",
  auth,
  role("USER"),
  addFeedback
);

router.get(
  "/",
  auth,
  role("ADMIN"),
  getFeedback
);

module.exports = router;