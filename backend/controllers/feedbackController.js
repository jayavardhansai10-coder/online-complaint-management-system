const Feedback = require("../models/Feedback");
const Complaint = require("../models/Complaint");

exports.addFeedback = async (req, res) => {
  try {
    const { complaint, rating, comment } = req.body;

    if (!complaint || !rating || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required.",
      });
    }

    const complaintData = await Complaint.findById(complaint);

    if (!complaintData) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    if (complaintData.status !== "Resolved") {
      return res.status(400).json({
        success: false,
        message:
          "Feedback can only be submitted after the complaint is resolved.",
      });
    }

    const existing = await Feedback.findOne({
      complaint,
      user: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Feedback already submitted.",
      });
    }

    const feedback = await Feedback.create({
      complaint,
      user: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getFeedback = async (req, res) => {
  try {

    const feedback = await Feedback.find()
      .populate("user", "name email")
      .populate("complaint", "title status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      feedback,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};