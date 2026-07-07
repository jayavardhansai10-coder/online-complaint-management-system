const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const express = require("express");
const router = express.Router();


const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.put("/forgot-password", authController.forgotPassword);

router.put(
  "/profile",
  require("../middleware/authMiddleware"),
  authController.updateProfile
);

router.put(
  "/upload-profile",
  auth,
  upload.single("profileImage"),
  authController.uploadProfileImage
);

module.exports = router;