const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  getDashboardStats,
  getAllComplaints,
} = require("../controllers/complaintController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// =======================
// User Routes
// =======================

// Create Complaint
router.post("/", auth, createComplaint);

// Get Logged-in User Complaints
router.get("/", auth, getComplaints);

// Dashboard Stats
router.get("/dashboard/stats", auth, getDashboardStats);

// =======================
// Admin Route
// =======================

// Get All Complaints
router.get(
  "/all",
  auth,
  role("ADMIN"),
  getAllComplaints
);

// =======================
// Complaint Details
// =======================

// Get Complaint By ID
router.get("/:id", auth, getComplaintById);

// Update Complaint
router.put("/:id", auth, updateComplaint);

// Delete Complaint
router.delete("/:id", auth, deleteComplaint);

module.exports = router;