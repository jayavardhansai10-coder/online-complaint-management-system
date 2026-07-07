const User = require("../models/User");
const Complaint = require("../models/Complaint");
const notificationService = require("../services/notificationService");

// Dashboard
exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalComplaints = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const assigned = await Complaint.countDocuments({
      status: "Assigned",
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    res.json({
      success: true,
      totalUsers,
      totalComplaints,
      pending,
      assigned,
      resolved,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// GET ALL COMPLAINTS
// ==============================

exports.getAllComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .populate("user", "name email")
      .populate("agent", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      complaints,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
// Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "USER",
    }).select("-password");

    res.json({
      success: true,
      users,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await User.find({
      role: "AGENT",
    }).select("-password");

    res.json({
      success: true,
      agents,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: "ADMIN",
    }).select("-password");

    res.json({
      success: true,
      admins,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// =============================
// ASSIGN AGENT
// =============================
exports.assignAgent = async (req, res) => {
  try {
    const { agentId } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Assign agent
    complaint.agent = agentId;
    complaint.status = "Assigned";

    // Save history
    complaint.history.push({
      status: "Assigned",
      updatedBy: req.user.id,
    });

    await complaint.save();

    // Populate user and agent details
    await complaint.populate("user", "name email");
    await complaint.populate("agent", "name email");

    // Notification to assigned agent
    await notificationService.createNotification(
      agentId,
      `A new complaint "${complaint.title}" has been assigned to you.`
    );

    // Notification to user
    await notificationService.createNotification(
      complaint.user._id,
      `Your complaint "${complaint.title}" has been assigned to an agent.`
    );

    res.json({
      success: true,
      message: "Complaint Assigned Successfully",
      complaint,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// =============================
// CHANGE USER STATUS
// =============================

exports.toggleUserStatus = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = !user.isActive;

    await user.save();

    res.json({
      success: true,
      message: "User status updated successfully",
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// =============================
// CHANGE USER ROLE
// =============================

exports.changeUserRole = async (req, res) => {
  try {

    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;

    await user.save();

    res.json({
      success: true,
      message: "Role Updated Successfully",
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// =============================
// DELETE USER
// =============================

exports.deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};