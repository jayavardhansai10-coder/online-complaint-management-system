import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getAssignedComplaints,
  updateComplaintStatus,
} from "../services/agentService";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import socket from "../services/socket";

function AgentDashboard() {
  const [complaints, setComplaints] = useState([]);

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
      const res = await getAssignedComplaints();

      if (res.data && Array.isArray(res.data.complaints)) {
        setComplaints(res.data.complaints);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      console.error(err);
      setComplaints([]);
    }
  };

  const changeStatus = async (id, status, title) => {
    try {
      await updateComplaintStatus(id, {
        status,
        remarks: "",
      });

      socket.emit("complaintUpdated", {
        complaintId: id,
        title,
        status,
      });

      loadComplaints();

      alert("Complaint Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Unable to update complaint.");
    }
  };

  return (
    <MainLayout>
      <div className="container-fluid">

        <h2 className="fw-bold mb-4">
          Agent Dashboard
        </h2>

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            Assigned Complaints
          </div>

          <div className="card-body">

            <table className="table table-bordered table-hover">

              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th width="250">Actions</th>
                </tr>
              </thead>

              <tbody>

                {complaints.length === 0 ? (

                  <tr>
                    <td colSpan="4" className="text-center">
                      No Assigned Complaints
                    </td>
                  </tr>

                ) : (

                  complaints.map((item) => (

                    <tr key={item._id}>

                      <td>{item.title}</td>

                      <td>{item.category}</td>

                      <td>

                        <span
                          className={`badge ${
                            item.status === "Assigned"
                              ? "bg-primary"
                              : item.status === "In Progress"
                              ? "bg-warning text-dark"
                              : item.status === "Resolved"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td>

                        <Link
                          to={`/complaint/${item._id}`}
                          className="btn btn-info btn-sm me-2"
                        >
                          <FaEye />
                        </Link>

                        <select
                          className="form-select form-select-sm d-inline w-auto"
                          value={item.status}
                          onChange={(e) =>
                            changeStatus(
                              item._id,
                              e.target.value,
                              item.title
                            )
                          }
                        >
                          <option value="Assigned">
                            Assigned
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Resolved">
                            Resolved
                          </option>

                          <option value="Closed">
                            Closed
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default AgentDashboard;