import axios from "axios";
import { conf } from "../conf/conf.js";

const axiosClient = axios.create({
  baseURL: conf.backendUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// axiosClient.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       window.dispatchEvent(new Event("unauthorized"));
//     }
//     Promise.reject(err);
//   }
// );

// axiosClient.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );

// axiosClient.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     if (!error.response) {
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await axios.get(`${conf.backendUrl}/user/refresh`, {
//           withCredentials: true,
//         });

//         return axiosClient(originalRequest);
//       } catch (err) {
//         console.log(`auth refesh ERROR`, err);
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosClient;
