const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("Email Error:", error.message);
  }
};

module.exports = sendEmail;