const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");

const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/agent", require("./routes/agentRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API 404 handler
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// Wildcard route to serve React index.html for frontend routing
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);
io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  socket.on("complaintUpdated", (data) => {
    console.log("Complaint Updated:", data);
    io.emit("complaintUpdated", data);
  });

  socket.on("newComplaint", (data) => {
    console.log("New Complaint:", data);
    io.emit("newComplaint", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });

});

// ✅ THIS PART IS MISSING
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});