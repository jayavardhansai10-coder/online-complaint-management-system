import API from "./api";

// Get Users
export const getUsers = () =>
  API.get("/admin/users");

// Get Agents
export const getAgents = () =>
  API.get("/admin/agents");

// Get Admins
export const getAdmins = () =>
  API.get("/admin/admins");

// Block / Unblock User
export const toggleUser = (id) => 
  API.put(`/admin/user/status/${id}`);

// Change User Role
export const changeRole = (id, role) =>
  API.put(`/admin/user/role/${id}`, { role });

// Delete User
export const deleteUser = (id) =>
  API.delete(`/admin/user/${id}`);