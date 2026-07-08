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

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);

        const res = await getComplaints(search);

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

    fetchComplaints();
  }, [search]);

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

      // Reload complaints after delete
      const res = await getComplaints(search);

      if (res.data.success) {
        setComplaints(res.data.complaints);
      } else {
        setComplaints([]);
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
      });
    }
  };

  return (
    <MainLayout>
      {/* Keep the remaining JSX exactly the same */}
    </MainLayout>
  );
}

export default MyComplaints;