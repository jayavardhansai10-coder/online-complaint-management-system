
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import MainLayout from "../layouts/MainLayout";
import {getComplaintById,updateComplaint,} from "../services/complaintService";

function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

 // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  loadComplaint();
}, []);
  const loadComplaint = async () => {
    try {
      const res = await getComplaintById(id);

     setForm({
  title: res.data.complaint.title,
  category: res.data.complaint.category,
  description: res.data.complaint.description,
});
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateComplaint(id, form);

      Swal.fire({
        icon: "success",
        title: "Complaint Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/mycomplaints");
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container">
        <div className="card shadow p-4">
          <h2 className="mb-4">Edit Complaint</h2>

          <form onSubmit={submitHandler}>

            <div className="mb-3">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={form.title}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-3">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={form.category}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="5"
                name="description"
                value={form.description}
                onChange={changeHandler}
              ></textarea>
            </div>

            <button className="btn btn-primary">
              Update Complaint
            </button>

          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditComplaint;
