const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationController");

// Get notifications
router.get("/", auth, getNotifications);

// IMPORTANT: put this BEFORE /:id
router.put("/read-all", auth, markAllAsRead);

// Mark single notification
router.put("/:id", auth, markAsRead);

module.exports = router;