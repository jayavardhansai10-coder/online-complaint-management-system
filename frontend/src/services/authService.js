import API from "./api";

// Update Profile
export const updateProfile = (data) => {
  return API.put("/auth/profile", data);
};

// Upload Profile Image
export const uploadProfileImage = (formData) => {
  return API.put("/auth/upload-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Login
export const login = (data) => {
  return API.post("/auth/login", data);
};

// Register
export const register = (data) => {
  return API.post("/auth/register", data);
};

// Forgot Password
export const forgotPassword = (data) => {
  return API.put("/auth/forgot-password", data);
};