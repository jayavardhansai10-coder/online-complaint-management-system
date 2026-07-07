import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/complaints/dashboard/stats");

      console.log("Dashboard Response:", res.data);

      setStats(res.data);
    } catch (err) {
      console.log(err.response || err);
    }
  };

  const pieData = {
    labels: ["Pending", "Assigned", "In Progress", "Resolved"],
    datasets: [
      {
        data: [
          stats.pending || 0,
          stats.assigned || 0,
          stats.inProgress || 0,
          stats.resolved || 0,
        ],
        backgroundColor: [
          "#ffc107",
          "#17a2b8",
          "#0d6efd",
          "#28a745",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Users", "Complaints", "Resolved"],
    datasets: [
      {
        label: "CMS Statistics",
        data: [
          stats.totalUsers || 0,
          stats.totalComplaints || 0,
          stats.resolved || 0,
        ],
        backgroundColor: [
          "#0d6efd",
          "#ffc107",
          "#28a745",
        ],
      },
    ],
  };

  return (
    <MainLayout>

      <h2 className="mb-4 fw-bold">
        Analytics Dashboard
      </h2>

      {/* Dashboard Cards */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Total Users</h6>
              <h2>{stats.totalUsers || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Total Complaints</h6>
              <h2>{stats.totalComplaints || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Resolved</h6>
              <h2>{stats.resolved || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Pending</h6>
              <h2>{stats.pending || 0}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="row">

        <div className="col-md-6">

          <div className="card shadow p-3">

            <h5>Status Distribution</h5>

            <Pie
              data={pieData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow p-3">

            <h5>Overall Statistics</h5>

            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Analytics;