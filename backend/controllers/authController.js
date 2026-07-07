const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// Register User
// ==========================
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
  phone,
  role: role || "USER",
});
    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Login User
// ==========================
exports.login = async (req, res) => {
     console.log("========== LOGIN API HIT ==========");
     console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }
const user = await User.findOne({ email });

console.log("Email entered:", email);
console.log("User found:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password.",
      });
    }
    console.log("Logged in User:");
console.log(user);
console.log("Role:", user.role);

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ==========================
// Forgot Password
// ==========================
exports.forgotPassword = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and New Password are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully. Please login.",
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ==========================
// Update Profile
// ==========================
exports.updateProfile = async (req, res) => {
  try {

    const { name, phone } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
// ==========================
// Upload Profile Image
// ==========================
exports.uploadProfileImage = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    user.profileImage = req.file.filename;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully.",
      profileImage: req.file.filename,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};