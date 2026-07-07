import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AOS from "aos";
import "aos/dist/aos.css";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";

import ComplaintForm from "./pages/ComplaintForm";
import ComplaintDetails from "./pages/ComplaintDetails";
import EditComplaint from "./pages/EditComplaint";

import MyComplaints from "./pages/MyComplaints";
import Analytics from "./pages/Analytics";
import AssignComplaint from "./pages/AssignComplaint";

import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";
import Notifications from "./pages/Notifications";
import AdminComplaints from "./pages/AdminComplaints";
import UserManagement from "./pages/UserManagement";


import "./styles/dashboard.css";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* USER */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint"
          element={
            <ProtectedRoute role="USER">
              <ComplaintForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mycomplaints"
          element={
            <ProtectedRoute role="USER">
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint/:id"
          element={
            <ProtectedRoute role={["USER", "ADMIN", "AGENT"]}>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute role="USER">
              <EditComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback/:id"
          element={
            <ProtectedRoute role="USER">
              <Feedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute role="ADMIN">
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="ADMIN">
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <AssignComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/feedback"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminFeedback />
            </ProtectedRoute>
          }
        />

        {/* AGENT */}

        <Route
          path="/agent"
          element={
            <ProtectedRoute role="AGENT">
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/complaints"
  element={
    <ProtectedRoute role="ADMIN">
      <AdminComplaints />
    </ProtectedRoute>
  }
/>

        {/* 404 */}

        <Route
          path="*"
          element={<h1>404 Page Not Found</h1>}
        />
        

      </Routes>

    </BrowserRouter>
  );
}

export default App;