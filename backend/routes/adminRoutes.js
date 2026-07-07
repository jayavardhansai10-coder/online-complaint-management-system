const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const adminController = require("../controllers/adminController");

// Dashboard
router.get(
  "/dashboard",
  auth,
  role("ADMIN"),
  adminController.dashboard
);


router.get(
  "/complaints",
  auth,
  role("ADMIN"),
  adminController.getAllComplaints
);
// Users
router.get(
  "/users",
  auth,
  role("ADMIN"),
  adminController.getUsers
);

// Agents
router.get(
  "/agents",
  auth,
  role("ADMIN"),
  adminController.getAgents
);

// Admins
router.get(
  "/admins",
  auth,
  role("ADMIN"),
  adminController.getAdmins
);

// Assign Agent
router.put(
  "/assign/:id",
  auth,
  role("ADMIN"),
  adminController.assignAgent
);


router.put(
  "/user/status/:id",
  auth,
  role("ADMIN"),
  adminController.toggleUserStatus
);

router.put(
  "/user/role/:id",
  auth,
  role("ADMIN"),
  adminController.changeUserRole
);

router.delete(
  "/user/:id",
  auth,
  role("ADMIN"),
  adminController.deleteUser
);

module.exports = router;