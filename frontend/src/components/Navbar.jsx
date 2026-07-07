import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

import NotificationBell from "./NotificationBell";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    await Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "You have been logged out successfully.",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div className="container-fluid">

        <h4 className="fw-bold text-primary mb-0">
          Complaint Management System
        </h4>

        <div className="d-flex align-items-center ms-auto">

          <div
            className="input-group me-4"
            style={{ width: "300px" }}
          >
            <span className="input-group-text bg-white">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search complaints..."
            />
          </div>

          <div className="me-4">
            <NotificationBell />
          </div>

          <Link
            to="/profile"
            className="text-decoration-none text-dark me-4"
          >
            <FaUserCircle size={34} />
          </Link>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;