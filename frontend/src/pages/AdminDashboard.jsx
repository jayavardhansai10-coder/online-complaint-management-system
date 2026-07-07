import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import ComplaintTable from "../components/ComplaintTable";

import ComplaintPieChart from "../components/charts/ComplaintPieChart";
import ComplaintBarChart from "../components/charts/ComplaintBarChart";

import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaUserCheck,
  FaChartBar,
  FaBell,
  FaComments,
} from "react-icons/fa";

import { getDashboardStats } from "../services/complaintService";
import socket from "../services/socket";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalComplaints: 0,
    pending: 0,
    assigned: 0,
    resolved: 0,
  });

  useEffect(() => {
  loadStats();

  socket.on("newComplaint", () => {
    loadStats();
  });

  socket.on("complaintUpdated", () => {
    loadStats();
  });

  socket.on("notification", () => {
    loadStats();
  });

  return () => {
    socket.off("newComplaint");
    socket.off("complaintUpdated");
    socket.off("notification");
  };
}, []);

  const loadStats = async () => {
    try {
      const res = await getDashboardStats();

      setStats({
        totalUsers: res.data.totalUsers || 0,
        totalComplaints: res.data.totalComplaints || 0,
        pending: res.data.pending || 0,
        assigned: res.data.assigned || 0,
        resolved: res.data.resolved || 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="container-fluid">

        {/* Welcome Card */}

        <div className="card shadow-lg border-0 rounded-4 mb-4">
          <div className="card-body">

            <h2 className="fw-bold">
              Welcome Admin 👋
            </h2>

            <h5 className="text-primary mt-2">
              Online Complaint Management System
            </h5>

            <p className="text-muted">
              Manage users, complaints, analytics, assignments,
              reports and monitor system performance.
            </p>

          </div>
        </div>

        {/* Dashboard Cards */}

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <DashboardCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<FaUsers />}
              color="primary"
            />
          </div>

          <div className="col-lg-3 col-md-6">
            <DashboardCard
              title="Total Complaints"
              value={stats.totalComplaints}
              icon={<FaClipboardList />}
              color="danger"
            />
          </div>

          <div className="col-lg-2 col-md-4">
            <DashboardCard
              title="Pending"
              value={stats.pending}
              icon={<FaClock />}
              color="warning"
            />
          </div>

          <div className="col-lg-2 col-md-4">
            <DashboardCard
              title="Assigned"
              value={stats.assigned}
              icon={<FaUserCheck />}
              color="info"
            />
          </div>

          <div className="col-lg-2 col-md-4">
            <DashboardCard
              title="Resolved"
              value={stats.resolved}
              icon={<FaCheckCircle />}
              color="success"
            />
          </div>

        </div>

        {/* Summary Cards */}

        <div className="row mt-5">

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body text-center">

                <h2 className="text-primary fw-bold">
                  {stats.totalComplaints}
                </h2>

                <p>Total Complaints Registered</p>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body text-center">

                <h2 className="text-warning fw-bold">
                  {stats.pending}
                </h2>

                <p>Complaints Waiting</p>

              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body text-center">

                <h2 className="text-success fw-bold">
                  {stats.resolved}
                </h2>

                <p>Successfully Resolved</p>

              </div>
            </div>
          </div>

        </div>

        {/* Complaint Management */}

        <div className="card shadow border-0 rounded-4 mt-5">

          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">
              Complaint Management
            </h5>
          </div>

          <div className="card-body">

            <ComplaintTable />

          </div>

        </div>

        {/* Recent Activity */}

        <div className="row mt-4">

          <div className="col-md-12">

            <div className="card shadow border-0 rounded-4">

              <div className="card-header bg-secondary text-white">

                <h5 className="mb-0">
                  Recent Activity
                </h5>

              </div>

              <div className="card-body">
                                <div className="d-flex justify-content-between border-bottom py-3">

                  <div>
                    <strong>📝 New Complaint Registered</strong>
                    <br />
                    <small className="text-muted">
                      A user submitted a new complaint.
                    </small>
                  </div>

                  <span className="badge bg-primary">
                    Today
                  </span>

                </div>

                <div className="d-flex justify-content-between border-bottom py-3">

                  <div>
                    <strong>👨‍💼 Complaint Assigned</strong>
                    <br />
                    <small className="text-muted">
                      Admin assigned complaint to an agent.
                    </small>
                  </div>

                  <span className="badge bg-warning text-dark">
                    Today
                  </span>

                </div>

                <div className="d-flex justify-content-between border-bottom py-3">

                  <div>
                    <strong>✅ Complaint Resolved</strong>
                    <br />
                    <small className="text-muted">
                      Agent marked complaint as resolved.
                    </small>
                  </div>

                  <span className="badge bg-success">
                    Yesterday
                  </span>

                </div>

                <div className="d-flex justify-content-between py-3">

                  <div>
                    <strong>⭐ Feedback Submitted</strong>
                    <br />
                    <small className="text-muted">
                      User submitted feedback.
                    </small>
                  </div>

                  <span className="badge bg-info">
                    Yesterday
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Charts */}

        <div className="row mt-4">

          <div className="col-md-6">

            <div className="card shadow border-0 rounded-4">

              <div className="card-header bg-primary text-white">
                Complaint Status
              </div>

              <div className="card-body">

                <ComplaintPieChart
                  pending={stats.pending}
                  assigned={stats.assigned}
                  resolved={stats.resolved}
                />

              </div>

            </div>

          </div>

          <div className="col-md-6">

            <div className="card shadow border-0 rounded-4">

              <div className="card-header bg-success text-white">
                Complaint Statistics
              </div>

              <div className="card-body">

                <ComplaintBarChart
                  pending={stats.pending}
                  assigned={stats.assigned}
                  resolved={stats.resolved}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="row mt-4">

          <div className="col-md-12">

            <div className="card shadow border-0 rounded-4">

              <div className="card-header bg-primary text-white">

                <h5 className="mb-0">
                  Quick Actions
                </h5>

              </div>

              <div className="card-body">

                <div className="d-flex flex-wrap gap-3">

                  <Link
                    to="/users"
                    className="btn btn-primary"
                  >
                    <FaUsers className="me-2" />
                    Manage Users
                  </Link>

                  <Link
                    to="/analytics"
                    className="btn btn-success"
                  >
                    <FaChartBar className="me-2" />
                    Analytics
                  </Link>

                  <Link
  to="/admin/complaints"
  className="btn btn-warning"
>
  <FaClipboardList className="me-2" />
  Complaints
</Link>
                  <Link
                    to="/admin/feedback"
                    className="btn btn-info text-white"
                  >
                    <FaComments className="me-2" />
                    Feedback
                  </Link>

                  <Link
                    to="/notifications"
                    className="btn btn-danger"
                  >
                    <FaBell className="me-2" />
                    Notifications
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <hr className="mt-5" />

        <div className="text-center text-muted mb-4">

          <h6>
            © 2026 Online Complaint Management System
          </h6>

          <small>
            Developed using MERN Stack • React • Node.js • Express • MongoDB
          </small>

        </div>

      </div>

    </MainLayout>

  );
}

export default AdminDashboard;