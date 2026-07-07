const Complaint = require("../models/Complaint");
const User = require("../models/User");
const notificationService = require("../services/notificationService");


// ==========================
// CREATE COMPLAINT
// ==========================
// ==========================
// CREATE COMPLAINT
// ==========================
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description and category are required",
      });
    }

    // Create complaint
    const complaint = await Complaint.create({
      title,
      description,
      category,
      user: req.user.id,
    });

    const io = req.app.get("io");
io.emit("newComplaint", complaint);

    // Notify all admins
    const admins = await User.find({ role: "ADMIN" });

    for (const admin of admins) {
      await notificationService.createNotification(
  admin._id,
  `New complaint submitted: ${complaint.title}`,
  io
);
    }

    // Notify user
    await notificationService.createNotification(
  req.user.id,
  "Your complaint has been submitted successfully.",
  io
);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
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
// ==========================
// GET LOGGED-IN USER COMPLAINTS WITH SEARCH
// ==========================
exports.getComplaints = async (req, res) => {
  try {

    const search = req.query.search;

    let filter = {
      user: req.user.id,
    };

    // Search by Title or Category
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const complaints = await Complaint.find(filter)
      .populate("user", "name email")
      .populate("agent", "name email")
      .sort({ createdAt: -1 });
      

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
// GET COMPLAINT BY ID
// ==========================
exports.getComplaintById = async (req, res) => {
  try {

    const complaint = await Complaint.findById(req.params.id)
  .populate("user", "name email")
  .populate("agent", "name email")
  .populate("history.updatedBy", "name");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    // Notify user when complaint is resolved
if (complaint.status === "Resolved") {
  await notificationService.createNotification(
  complaint.user._id || complaint.user,
  `Your complaint "${complaint.title}" has been resolved.`,
  req.app.get("io")
);
}

    res.status(200).json({
      success: true,
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
// UPDATE COMPLAINT
// ==========================
exports.updateComplaint = async (req, res) => {
  try {
    const allowedUpdates = [
      "title",
      "description",
      "category",
      "status",
      "agent",
      "remarks",
    ];

    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", "name email")
      .populate("agent", "name email");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // ==========================
    // SOCKET.IO LIVE UPDATE
    // ==========================
    const io = req.app.get("io");

    io.emit("complaintUpdated", complaint);

    // ==========================
    // NOTIFY ASSIGNED AGENT
    // ==========================
    if (updates.agent) {
      await notificationService.createNotification(
        updates.agent,
        `You have been assigned complaint "${complaint.title}".`,
        io
      );
    }

    // ==========================
    // NOTIFY USER ABOUT STATUS
    // ==========================
    if (updates.status) {
      await notificationService.createNotification(
        complaint.user._id,
        `Your complaint "${complaint.title}" status changed to ${updates.status}.`,
        io
      );
    }

    // ==========================
    // EXTRA NOTIFICATION WHEN RESOLVED
    // ==========================
    if (updates.status === "Resolved") {
      await notificationService.createNotification(
        complaint.user._id,
        `🎉 Your complaint "${complaint.title}" has been resolved.`,
        io
      );
    }

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
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
// DELETE COMPLAINT
// ==========================
exports.deleteComplaint = async (req, res) => {
  try {

    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================
// ADMIN DASHBOARD STATS
// ==========================
exports.getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalComplaints = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const assigned = await Complaint.countDocuments({
      status: "Assigned",
    });

    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    res.status(200).json({
      success: true,
      totalUsers,
      totalComplaints,
      pending,
      assigned,
      inProgress,
      resolved,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================
// ADMIN - GET ALL COMPLAINTS
// ==========================
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .populate("agent", "name email")
      .sort({ createdAt: -1 });

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