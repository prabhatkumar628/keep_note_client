import axiosClient from "./axiosClient.js";

export const labelApi = {
  createLabel: (data) => axiosClient.post("/label/create", data),
  getLabel: () => axiosClient.get("/label/get"),
  getLabelById: (id) => axiosClient.get(`/label/get/${id}`),
  updateLabel: (id, data) => axiosClient.put(`/label/update/${id}`, data),
  bulkUpdateLabel: (data) => axiosClient.put("/label/bulk-update", {labels:data}),
  deleteLabel: (id) => axiosClient.delete(`/label/delete/${id}`),
};
