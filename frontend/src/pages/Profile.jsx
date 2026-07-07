import { useState } from "react";
import Swal from "sweetalert2";
import MainLayout from "../layouts/MainLayout";
import {
  updateProfile,
  uploadProfileImage,
} from "../services/authService";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    role: currentUser?.role || "",
  });

  const [image, setImage] = useState(null);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        name: form.name,
        phone: form.phone,
      });

      if (image) {
        const formData = new FormData();
        formData.append("profileImage", image);

        const uploadRes = await uploadProfileImage(formData);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            name: form.name,
            phone: form.phone,
            profileImage: uploadRes.data.profileImage,
          })
        );
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            name: form.name,
            phone: form.phone,
          })
        );
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully",
      });

    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response);

      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3>My Profile</h3>
          </div>

          <div className="card-body">

            <div className="text-center mb-4">
              {currentUser?.profileImage ? (
                <img
                  src={`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/uploads/${currentUser.profileImage}`}
                  alt="Profile"
                  width="150"
                  height="150"
                  className="rounded-circle border"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  width="150"
                  height="150"
                  className="rounded-circle border"
                />
              )}
            </div>

            <form onSubmit={submitHandler}>

              <div className="mb-3">
                <label>Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={imageHandler}
                />
              </div>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={changeHandler}
                />
              </div>

              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={changeHandler}
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label>Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.role}
                  disabled
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>

            </form>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Profile;