import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import Swal from "sweetalert2";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await API.put(`/admin/user/role/${id}`, { role });

      Swal.fire("Success", "Role Updated Successfully", "success");

      loadUsers();

    } catch (err) {
      console.log(err);
    }
  };

  const changeStatus = async (id) => {
    try {
      await API.put(`/admin/user/status/${id}`);

      Swal.fire("Success", "Status Updated", "success");

      loadUsers();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {

    const result = await Swal.fire({
      title: "Delete User?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {

      await API.delete(`/admin/user/${id}`);

      Swal.fire("Deleted", "User Deleted Successfully", "success");

      loadUsers();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>

      <div className="container mt-4">

        <h2 className="mb-4">User Management</h2>

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Role</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.phone}</td>

                <td>{user.role}</td>

                <td>
                  {user.isActive ? (
                    <span className="badge bg-success">
                      Active
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      Inactive
                    </span>
                  )}
                </td>

                <td>

                  <select
                    className="form-select mb-2"
                    defaultValue={user.role}
                    onChange={(e) =>
                      changeRole(user._id, e.target.value)
                    }
                  >
                    <option value="USER">USER</option>
                    <option value="AGENT">AGENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => changeStatus(user._id)}
                  >
                    Status
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default AdminUsers;