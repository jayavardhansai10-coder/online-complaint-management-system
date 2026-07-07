import { useState } from "react";
import { login } from "../services/authService";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      const role = res.data.user.role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "AGENT") {
        navigate("/agent");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          err.response?.data?.message ||
          "Invalid email or password",
      });
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#2563eb,#38bdf8)",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "430px",
          borderRadius: "25px",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">
            <div
              className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center"
              style={{
                width: "80px",
                height: "80px",
                fontSize: "32px",
              }}
            >
              <FaUserShield />
            </div>

            <h2 className="fw-bold mt-3 text-primary">
              Complaint Management
            </h2>

            <p className="text-muted">
              Sign in to continue
            </p>
          </div>

          <form onSubmit={submitHandler}>

            <div className="mb-3">

              <label className="fw-semibold">
                Email Address
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaEnvelope />
                </span>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={form.email}
                  onChange={changeHandler}
                  required
                />

              </div>

            </div>

            <div className="mb-3">

              <label className="fw-semibold">
                Password
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={changeHandler}
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            <div className="d-flex justify-content-between mb-4">

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">
                  Remember Me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-decoration-none"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              className="btn btn-primary w-100 py-2 fw-bold"
              style={{
                borderRadius: "10px",
              }}
            >
              Login
            </button>

          </form>

          <div className="text-center mt-4">

            <span className="text-muted">
              Don't have an account?
            </span>

            <br />

            <Link
              to="/register"
              className="fw-bold text-decoration-none"
            >
              Create Account
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;