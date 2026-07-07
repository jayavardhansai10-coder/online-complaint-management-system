const Notification = require("../models/Notification");

exports.createNotification = async (userId, message, io) => {
  try {
    const notification = await Notification.create({
      user: userId,
      message,
    });

    if (io) {
      io.emit("notification", notification);
    }

    return notification;

  } catch (err) {
    console.log(err.message);
  }
};