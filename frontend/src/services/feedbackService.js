import API from "./api";

export const addFeedback = (data) =>
  API.post("/feedback", data);

export const getFeedback = () =>
  API.get("/feedback");