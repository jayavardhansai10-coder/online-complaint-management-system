import api from "./api";

// =========================
// USER COMPLAINTS
// =========================

export const getComplaints = (search = "") =>
  api.get(`/complaints?search=${search}`);

export const getComplaintById = (id) =>
  api.get(`/complaints/${id}`);

export const createComplaint = (data) =>
  api.post("/complaints", data);

export const updateComplaint = (id, data) =>
  api.put(`/complaints/${id}`, data);

export const deleteComplaint = (id) =>
  api.delete(`/complaints/${id}`);

// =========================
// ADMIN
// =========================

export const getDashboardStats = () =>
  api.get("/admin/dashboard");

export const getAgents = () =>
  api.get("/admin/agents");

export const getAllComplaints = () =>
  api.get("/admin/complaints");

export const assignComplaintToAgent = (id, agentId) =>
  api.put(`/admin/assign/${id}`, {
    agentId,
  });