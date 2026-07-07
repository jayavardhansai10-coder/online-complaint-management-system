const Notification = require("../models/Notification");

const createNotification = async (userId, message) => {
  try {
    await Notification.create({
      user: userId,
      message,
    });
  } catch (err) {
    console.log("Notification Error:", err.message);
  }
};

module.exports = createNotification;