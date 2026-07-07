import API from "./api";

export const getAssignedComplaints = () =>
  API.get("/agent/complaints");

export const updateComplaintStatus = (id, data) =>
  API.put(`/agent/complaints/${id}`, data);