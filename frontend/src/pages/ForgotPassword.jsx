import { useState } from "react";
import { forgotPassword } from "../services/authService";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ForgotPassword() {
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
      const res = await forgotPassword(form);

      Swal.fire({
        icon: "success",
        title: res.data.message,
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0d6efd,#0dcaf0)",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{ width: "450px" }}
      >
        <h2 className="text-center mb-4">
          Forgot Password
        </h2>

        <form onSubmit={submitHandler}>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-3">
            <label>New Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={changeHandler}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Reset Password
          </button>

        </form>

        <div className="text-center mt-3">
          <Link to="/login">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;