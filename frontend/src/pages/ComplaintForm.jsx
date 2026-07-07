import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";
import { createComplaint } from "../services/complaintService";

function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      await createComplaint(formData);

      Swal.fire({
        icon: "success",
        title: "Complaint Submitted Successfully",
        text: "Your complaint has been sent.",
      });

      setFormData({
        title: "",
        category: "",
        description: "",
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.response?.data?.message || "Server Error",
      });
    }
  };

  return (
    <MainLayout>

      <div className="container">

        <div className="card shadow border-0">

          <div className="card-header bg-primary text-white">
            <h3>Submit Complaint</h3>
          </div>

          <div className="card-body">

            <form onSubmit={submitComplaint}>

              <div className="mb-3">
                <label>Complaint Title</label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Category</label>

                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option>Electricity</option>
                  <option>Water Supply</option>
                  <option>Internet</option>
                  <option>Road</option>
                  <option>Garbage</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Description</label>

                <textarea
                  rows="5"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button className="btn btn-primary">
                Submit Complaint
              </button>

            </form>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default ComplaintForm;