const Complaint = require("../models/Complaint");
const User = require("../models/User");
const notificationService = require("../services/notificationService");
// ==========================
// GET ASSIGNED COMPLAINTS (AGENT)
// ==========================
exports.getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      agent: req.user.id,
    })
      .populate("user", "name email")
      .populate("agent", "name email");

    res.status(200).json({
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

// ==========================
// UPDATE STATUS (AGENT)
// ==========================
exports.updateStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const complaint = await Complaint.findOne({
      _id: req.params.id,
      agent: req.user.id,
    });

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found or not assigned to you.",
      });
    }

    complaint.status = status;
    complaint.remarks = remarks;
    complaint.history.push({
  status,
  updatedBy: req.user.id,
});

    await complaint.save();

    // Notify the user
    await notificationService.createNotification(
      complaint.user,
      `Your complaint "${complaint.title}" status has been updated to "${status}".`
    );

    res.status(200).json({
      success: true,
      message: "Complaint Updated Successfully",
      complaint,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ==========================
// GET ALL AGENTS (ADMIN)
// ==========================
exports.getAgents = async (req, res) => {
  try {
    const agents = await User.find({
      role: "AGENT",
      isActive: true,
    }).select("-password");

    res.status(200).json({
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