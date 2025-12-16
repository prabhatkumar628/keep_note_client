import axiosClient from "./axiosClient.js";

export const todoApi = {
  createTodo: (data) => axiosClient.post("/todo/create", data),
  getTodo: () => axiosClient.get("/todo/get"),
  updateTodo: (id, data) => axiosClient.put(`/todo/update/${id}`, data),
  deleteTodo: (id) => axiosClient.delete(`/todo/delete/${id}`),
};
