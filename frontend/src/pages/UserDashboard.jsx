import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import { getComplaints } from "../services/complaintService";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
import socket from "../services/socket";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function UserDashboard() {
  const [complaints, setComplaints] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  loadComplaints();

  socket.on("newComplaint", () => {
    loadComplaints();
  });

  socket.on("complaintUpdated", () => {
    loadComplaints();
  });

  return () => {
    socket.off("newComplaint");
    socket.off("complaintUpdated");
  };
}, []);

  const loadComplaints = async () => {
    try {
      const res = await getComplaints();
      setComplaints(res.data.complaints || []);
    } catch (err) {
      console.log(err);
    }
  };

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const assigned = complaints.filter(c => c.status === "Assigned").length;
  const progress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const chartData = {
    labels: ["Pending", "Assigned", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Complaints",
        data: [pending, assigned, progress, resolved],
        backgroundColor: [
          "#ffc107",
          "#0d6efd",
          "#0dcaf0",
          "#198754",
        ],
      },
    ],
  };

  return (
    <MainLayout>

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <h2 className="fw-bold">
            Welcome, {user?.name} 👋
          </h2>

          <p className="text-muted mb-0">
            Complaint Management Dashboard
          </p>

        </div>

      </div>

      <div className="row g-4">

        <div className="col-lg-3">
          <DashboardCard
            title="Total"
            value={total}
            icon={<FaClipboardList />}
            color="primary"
          />
        </div>

        <div className="col-lg-3">
          <DashboardCard
            title="Pending"
            value={pending}
            icon={<FaClock />}
            color="warning"
          />
        </div>

        <div className="col-lg-3">
          <DashboardCard
            title="Assigned"
            value={assigned}
            icon={<FaSpinner />}
            color="info"
          />
        </div>

        <div className="col-lg-3">
          <DashboardCard
            title="Resolved"
            value={resolved}
            icon={<FaCheckCircle />}
            color="success"
          />
        </div>

      </div>

      <div className="row mt-5">

        <div className="col-lg-8">

          <div className="card shadow border-0">

            <div className="card-header bg-primary text-white">
              Complaint Analytics
            </div>

            <div className="card-body">
              <Bar data={chartData} />
            </div>

          </div>

        </div>

        <div className="col-lg-4">

          <div className="card shadow border-0">

            <div className="card-header bg-success text-white">
              Status Overview
            </div>

            <div className="card-body">
              <Pie data={chartData} />
            </div>

          </div>

        </div>

      </div>

      <div className="card shadow border-0 mt-5">

        <div className="card-header bg-dark text-white">
          Recent Complaints
        </div>

        <div className="card-body">

          <table className="table table-hover">

            <thead className="table-light">

              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {complaints.map(item => (

                <tr key={item._id}>

                  <td>{item.title}</td>

                  <td>{item.category}</td>

                  <td>

                    <span
                      className={`badge ${
                        item.status === "Resolved"
                          ? "bg-success"
                          : item.status === "Pending"
                          ? "bg-warning text-dark"
                          : item.status === "Assigned"
                          ? "bg-primary"
                          : "bg-info"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}

export default UserDashboard;