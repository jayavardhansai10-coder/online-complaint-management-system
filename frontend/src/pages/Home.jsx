import { Link } from "react-router-dom";
import { FaClipboardList, FaUserShield, FaHeadset } from "react-icons/fa";

function Home() {
  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0d6efd,#0dcaf0)",
      }}
    >
      <div className="container py-5">

        <div className="row align-items-center">

          <div className="col-lg-6 text-white">

            <h1 className="display-4 fw-bold mb-4">
              Online Complaint Management System
            </h1>

            <p className="lead mb-4">
              Submit, track, and manage complaints efficiently with our modern
              complaint management platform.
            </p>

            <Link to="/login" className="btn btn-light btn-lg me-3">
              Login
            </Link>

            <Link to="/register" className="btn btn-outline-light btn-lg">
              Register
            </Link>

          </div>

          <div className="col-lg-6">

            <div className="card shadow-lg border-0 p-4">

              <div className="row text-center">

                <div className="col-md-4">
                  <FaClipboardList size={50} className="text-primary mb-3" />
                  <h5>Easy Complaint</h5>
                </div>

                <div className="col-md-4">
                  <FaUserShield size={50} className="text-success mb-3" />
                  <h5>Secure System</h5>
                </div>

                <div className="col-md-4">
                  <FaHeadset size={50} className="text-warning mb-3" />
                  <h5>24/7 Support</h5>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;