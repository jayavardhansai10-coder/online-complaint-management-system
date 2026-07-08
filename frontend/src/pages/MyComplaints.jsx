import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MainLayout from "../layouts/MainLayout";
import {
  getComplaints,
  deleteComplaint,
} from "../services/complaintService";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  loadComplaints();
}, [search]);

  const loadComplaints = async () => {
    try {
      setLoading(true);

      const res = await getComplaints(search);

      console.log(res.data);

      if (res.data.success) {
        setComplaints(res.data.complaints);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Failed to Load Complaints",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeComplaint = async (id) => {
    const result = await Swal.fire({
      title: "Delete Complaint?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteComplaint(id);

      Swal.fire({
        icon: "success",
        title: "Complaint Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      loadComplaints();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mt-4">

        <h2 className="fw-bold mb-4">My Complaints</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title or Category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card shadow">
          <div className="card-body">

            {loading ? (

              <h5 className="text-center">
                Loading...
              </h5>

            ) : complaints.length === 0 ? (

              <h5 className="text-center text-muted">
                No Complaints Found
              </h5>

            ) : (

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th width="250">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {complaints.map((item) => (

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

                        {/* View */}

                        <Link
                          to={`/complaint/${item._id}`}
                          className="btn btn-primary btn-sm me-2"
                          title="View"
                        >
                          <FaEye />
                        </Link>

                        {/* Edit only Pending */}

                        {item.status === "Pending" && (

                          <Link
                            to={`/edit/${item._id}`}
                            className="btn btn-warning btn-sm me-2"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>

                        )}

                        {/* Feedback only Resolved */}

                        {item.status === "Resolved" && (

                          <Link
                            to={`/feedback/${item._id}`}
                            className="btn btn-success btn-sm me-2"
                            title="Feedback"
                          >
                            <FaStar />
                          </Link>

                        )}

                        {/* Delete only Pending */}

                        {item.status === "Pending" && (

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeComplaint(item._id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default MyComplaints;