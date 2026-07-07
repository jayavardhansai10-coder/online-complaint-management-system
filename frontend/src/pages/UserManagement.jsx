import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getUsers,
  toggleUser,
  deleteUser,
  changeRole,
} from "../services/adminService";

import Swal from "sweetalert2";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = async (id) => {
    await toggleUser(id);

    Swal.fire({
      icon: "success",
      title: "User Status Updated",
      timer: 1200,
      showConfirmButton: false,
    });

    loadUsers();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    await deleteUser(id);

    Swal.fire({
      icon: "success",
      title: "Deleted Successfully",
      timer: 1200,
      showConfirmButton: false,
    });

    loadUsers();
  };

  const handleRole = async (id, role) => {
    await changeRole(id, role);

    Swal.fire({
      icon: "success",
      title: "Role Updated",
      timer: 1200,
      showConfirmButton: false,
    });

    loadUsers();
  };

  return (
    <MainLayout>
      <div className="container-fluid">

        <h2 className="mb-4 fw-bold">
          User Management
        </h2>

        <table className="table table-bordered table-hover shadow">

          <thead className="table-dark">

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th width="320">Actions</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>

                  {user.isActive ? (

                    <span className="badge bg-success">
                      Active
                    </span>

                  ) : (

                    <span className="badge bg-danger">
                      Blocked
                    </span>

                  )}

                </td>

                <td>{user.role}</td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      handleToggle(user._id)
                    }
                  >
                    Block / Unblock
                  </button>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() =>
                      handleRole(user._id, "AGENT")
                    }
                  >
                    Make Agent
                  </button>

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() =>
                      handleRole(user._id, "USER")
                    }
                  >
                    Make User
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(user._id)
                    }
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

export default UserManagement;