import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getComplaintById } from "../services/complaintService";
import Swal from "sweetalert2";

function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await getComplaintById(id);

        setComplaint(res.data?.complaint || {});
      } catch (err) {
        console.error(err);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unable to load complaint details.",
        });

        setComplaint({});
      }
    };

    fetchComplaint();
  }, [id]);

  if (complaint === null) {
    return (
      <MainLayout>
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <h5 className="mt-3">Loading Complaint...</h5>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="card shadow-lg border-0 rounded-4">

        {/* Header */}

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Complaint Details</h4>
        </div>

        {/* Body */}

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="fw-bold">Title</label>
              <input
                className="form-control bg-light"
                value={complaint?.title || "-"}
                readOnly
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-bold">Category</label>
              <input
                className="form-control bg-light"
                value={complaint?.category || "-"}
                readOnly
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-bold d-block mb-2">Status</label>

              <span
                className={`badge fs-6 ${
                  complaint?.status === "Pending"
                    ? "bg-warning text-dark"
                    : complaint?.status === "Assigned"
                    ? "bg-primary"
                    : complaint?.status === "In Progress"
                    ? "bg-info"
                    : complaint?.status === "Resolved"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {complaint?.status || "-"}
              </span>
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-bold d-block mb-2">Priority</label>

              <span
                className={`badge fs-6 ${
                  complaint?.priority === "High"
                    ? "bg-danger"
                    : complaint?.priority === "Medium"
                    ? "bg-warning text-dark"
                    : complaint?.priority === "Low"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {complaint?.priority || "-"}
              </span>
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-bold">User</label>
              <input
                className="form-control bg-light"
                value={complaint?.user?.name || "Unknown User"}
                readOnly
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-bold">Email</label>
              <input
                className="form-control bg-light"
                value={complaint?.user?.email || "-"}
                readOnly
              />
            </div>

            <div className="col-12 mb-3">
              <label className="fw-bold">Description</label>

              <textarea
                className="form-control bg-light"
                rows="5"
                value={complaint?.description || "No description"}
                readOnly
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-bold">Assigned Agent</label>

              <input
                className="form-control bg-light"
                value={complaint?.agent?.name || "Not Assigned"}
                readOnly
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-bold">Registered On</label>

              <input
                className="form-control bg-light"
                value={
                  complaint?.createdAt
                    ? new Date(complaint.createdAt).toLocaleString()
                    : "-"
                }
                readOnly
              />
            </div>

          </div>

          {/* Feedback Button */}

          {complaint?.status === "Resolved" && complaint?._id && (
            <div className="mt-4">
              <Link
                to={`/feedback/${complaint._id}`}
                className="btn btn-success"
              >
                ⭐ Give Feedback
              </Link>
            </div>
          )}

        </div>

        {/* Complaint History */}

        <div className="card m-3 shadow border-0">

          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Complaint History</h5>
          </div>

          <div className="card-body">

            {complaint?.history?.length > 0 ? (

              <ul className="list-group">

                {complaint.history.map((item, index) => (

                  <li
                    key={item._id || index}
                    className="list-group-item"
                  >
                    <strong>Status:</strong> {item.status || "-"}

                    <br />

                    <strong>Updated By:</strong>{" "}
                    {item.updatedBy?.name || "System"}

                    <br />

                    <small className="text-muted">
                      {item.date
                        ? new Date(item.date).toLocaleString()
                        : "-"}
                    </small>

                  </li>

                ))}

              </ul>

            ) : (

              <div className="alert alert-info mb-0">
                No history available.
              </div>

            )}

          </div>

        </div>

        {/* Back Button */}

        <div className="p-3">
          <Link
            to="/dashboard"
            className="btn btn-secondary"
          >
            ← Back to Dashboard
          </Link>
        </div>

      </div>
    </MainLayout>
  );
}

export default ComplaintDetails;