import axiosClient from "./axiosClient.js";

export const authApi = {
  register: (data) => axiosClient.post("/user/register", data),
  login: (data) => axiosClient.post("/user/login", data),
  logout: () => axiosClient.get("/user/logout"),
  currentUser: () => axiosClient.get("/user/current"),
  refreshUser: () => axiosClient.get("/user/refresh"),
  uploadAvatar: (data) =>
    axiosClient.post("/user/avatar", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateUser: (data) =>
    axiosClient.post("/user/update", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
