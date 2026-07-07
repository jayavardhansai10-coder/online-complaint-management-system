import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {getAllComplaints,deleteComplaint,} from "../services/complaintService";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import socket from "../services/socket";

function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const complaintsPerPage = 5;

  useEffect(() => {
  loadComplaints();

  socket.on("newComplaint", () => {
    loadComplaints();
  });

  socket.on("complaintUpdated", () => {
    loadComplaints();
  });

  socket.on("notification", () => {
    loadComplaints();
  });

  return () => {
    socket.off("newComplaint");
    socket.off("complaintUpdated");
    socket.off("notification");
  };
}, []);

  const loadComplaints = async () => {
    try {
      const res = await getAllComplaints();
      setComplaints(res.data.complaints || []);
    } catch (err) {
      console.log(err);

      Swal.fire(
        "Error",
        "Unable to load complaints.",
        "error"
      );
    }
  };

  const removeComplaint = async (id) => {
    const result = await Swal.fire({
      title: "Delete Complaint?",
      text: "This complaint will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteComplaint(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadComplaints();
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
      });
    }
  };
const exportToExcel = () => {
  const data = complaints.map((item) => ({
    Title: item.title,
    User: item.user?.name || "",
    Category: item.category,
    Status: item.status,
    Agent: item.agent?.name || "Not Assigned",
    Date: new Date(item.createdAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Complaints"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(fileData, "Complaint_Report.xlsx");
};

const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Complaint Management System", 14, 15);

  doc.setFontSize(12);
  doc.text("Complaint Report", 14, 25);

  doc.setFontSize(10);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    32
  );

  const tableData = complaints.map((item) => [
    item.title,
    item.user?.name || "",
    item.category,
    item.status,
    item.agent?.name || "Not Assigned",
    new Date(item.createdAt).toLocaleDateString(),
  ]);

  autoTable(doc, {
    startY: 40,
    head: [
      ["Title", "User", "Category", "Status", "Agent", "Date"],
    ],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
    },
  });

  doc.save("Complaint_Report.pdf");
};

  // Search + Filter
  const filteredComplaints = complaints.filter((item) => {
   const matchesSearch =
  (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
  (item.category || "").toLowerCase().includes(search.toLowerCase()) ||
  (item.status || "").toLowerCase().includes(search.toLowerCase()) ||
  (item.user?.name || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastComplaint =
    currentPage * complaintsPerPage;

  const indexOfFirstComplaint =
    indexOfLastComplaint - complaintsPerPage;

  const currentComplaints =
    filteredComplaints.slice(
      indexOfFirstComplaint,
      indexOfLastComplaint
    );

  const totalPages = Math.ceil(
    filteredComplaints.length / complaintsPerPage
  );

  return (
    <div
  className="card shadow-lg border-0 rounded-4"
  style={{
    overflow: "hidden",
  }}
>

      <div className="card-header bg-primary text-white fw-bold fs-5">
        Complaint List
      </div>

      <div className="card-body">

        <h5 className="mb-3">
          Total Complaints : {complaints.length}
        </h5>
        <div className="d-flex justify-content-end gap-2 mb-3">

  <button
   className="btn btn-success rounded-pill px-4"
    onClick={exportToExcel}
  >
    <i className="bi bi-file-earmark-excel me-2"></i>
    Export Excel
  </button>

  <button
   className="btn btn-danger rounded-pill px-4"
    onClick={exportToPDF}
  >
    <i className="bi bi-file-earmark-pdf me-2"></i>
    Export PDF
  </button>

</div>

        <div className="row mb-3">

          <div className="col-md-8">

           <input
  type="text"
  className="form-control rounded-pill shadow-sm"
  placeholder="Search by Title, User, Category or Status..."
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }}
/>

          </div>

          <div className="col-md-4">

          <select
  className="form-select rounded-pill shadow-sm"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >

              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Assigned">
                Assigned
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>

          </div>

        </div>

      <div
  className="table-responsive"
  style={{
    maxHeight: "550px",
    overflowY: "auto",
  }}
>

          <table className="table table-hover align-middle">

          <thead
className="table-dark"
style={{
position:"sticky",
top:0,
zIndex:100,
background:"#212529"
}}
>
  <tr>
    <th>Title</th>
    <th>User</th>
    <th>Category</th>
    <th>Date</th>
    <th>Status</th>
    <th>Assigned Agent</th>
    <th width="260">Actions</th>
  </tr>
</thead>

            <tbody>

              {currentComplaints.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-4"
                  >
                    No Complaints Found
                  </td>

                </tr>

              ) : (

                currentComplaints.map((item) => (

                  <tr
  key={item._id}
  style={{
    transition: "0.3s",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#f8f9fa";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "white";
  }}
>

                   <td>{item.title || "-"}</td>

                   <td>{item.user?.name || "Unknown User"}</td>

                  <td>{item.category || "-"}</td>

                    <td>
  {new Date(item.createdAt).toLocaleString()}
</td>

                    <td>

                      <span
                        className={`badge ${
                          item.status === "Pending"
                            ? "bg-warning text-dark"
                            : item.status === "Assigned"
                            ? "bg-primary"
                            : item.status === "In Progress"
                            ? "bg-info"
                            : item.status === "Resolved"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td>

                      {item.agent
                        ? item.agent.name
                        : "Not Assigned"}

                    </td>

                    <td>

                      <Link
                        to={`/complaint/${item._id}`}
                        className="btn btn-info btn-sm rounded-pill me-2"
                      >
                        View
                      </Link>

                      {item.agent ? (

                        <button
  className="btn btn-success btn-sm rounded-pill me-2"
  disabled
>
                          Assigned
                        </button>

                      ) : (

                        <Link
                          to={`/assign/${item._id}`}
                          className="btn btn-warning btn-sm rounded-pill me-2"
                        >
                          Assign
                        </Link>

                      )}

                      <button
className="btn btn-danger btn-sm rounded-pill"
onClick={() => removeComplaint(item._id)}
>
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}

        <div className="d-flex justify-content-center align-items-center mt-4">

          <button
            className="btn btn-outline-primary me-3"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            Previous
          </button>

          <span
  className="badge bg-dark fs-6 px-4 py-2"
  style={{ borderRadius: "20px" }}
>
  Page {currentPage} of {totalPages || 1}
</span>
          <button
            className="btn btn-outline-primary ms-3"
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default ComplaintTable;