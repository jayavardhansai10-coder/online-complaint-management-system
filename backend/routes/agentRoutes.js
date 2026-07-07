const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const agentController = require("../controllers/agentController");

// AGENT - get assigned complaints
router.get(
  "/complaints",
  auth,
  role("AGENT"),
  agentController.getAssignedComplaints
);

// AGENT - update status
router.put(
  "/complaints/:id",
  auth,
  role("AGENT"),
  agentController.updateStatus
);

// ADMIN - get all agents (for assign dropdown)
router.get(
  "/list",
  auth,
  role("ADMIN"),
  agentController.getAgents
);

module.exports = router;