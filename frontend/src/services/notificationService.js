import api from "./api";

export const getNotifications = () =>
  api.get("/notifications");

export const markAsRead = (id) =>
  api.put(`/notifications/${id}`);

export const markAllAsRead = () =>
  api.put("/notifications/read-all");