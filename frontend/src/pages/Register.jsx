import { useState } from "react";
import { register } from "../services/authService";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
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
      await register(form);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Please login.",
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0d6efd,#0dcaf0)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "470px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">

            <FaUserPlus
              size={65}
              className="text-primary mb-3"
            />

            <h2 className="fw-bold text-primary">
              Create Account
            </h2>

            <p className="text-muted">
              Register to Complaint Management System
            </p>

          </div>

          <form onSubmit={submitHandler}>

            {/* Name */}

            <div className="input-group mb-3">

              <span className="input-group-text">
                <FaUser />
              </span>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Full Name"
                value={form.name}
                onChange={changeHandler}
                required
              />

            </div>

            {/* Email */}

            <div className="input-group mb-3">

              <span className="input-group-text">
                <FaEnvelope />
              </span>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                value={form.email}
                onChange={changeHandler}
                required
              />

            </div>

            {/* Phone */}

            <div className="input-group mb-3">

              <span className="input-group-text">
                <FaPhone />
              </span>

              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone Number"
                value={form.phone}
                onChange={changeHandler}
              />

            </div>

            {/* Password */}

            <div className="input-group mb-3">

              <span className="input-group-text">
                <FaLock />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Password"
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

            {/* Role */}

            <div className="mb-4">

              <label className="form-label fw-bold">
                Register As
              </label>

              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={changeHandler}
              >
                <option value="USER">User</option>
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Admin</option>
              </select>

            </div>

            <button className="btn btn-primary w-100 py-2 fw-bold">
              Create Account
            </button>

          </form>

          <hr />

          <div className="text-center">

            Already have an account?

            <br />

            <Link
              to="/login"
              className="fw-bold text-decoration-none"
            >
              Login Here
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;