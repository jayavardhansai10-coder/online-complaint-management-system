import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">

      <h4 className="mb-0 fw-bold">
        Complaint Management System
      </h4>

      <div className="d-flex align-items-center">

        <div className="input-group me-3" style={{ width: "300px" }}>
          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            className="form-control"
            placeholder="Search complaints..."
          />
        </div>

        <FaBell size={22} className="me-3 text-primary" />

        <FaUserCircle size={34} className="text-primary" />

      </div>

    </div>
  );
}

export default Topbar;