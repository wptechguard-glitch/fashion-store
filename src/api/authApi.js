import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fs_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const registerUserApi = (data) => api.post("/auth/register", data);
export const loginUserApi = (data) => api.post("/auth/login", data);
export const getProfileApi = () => api.get("/auth/profile");
export const updateProfileApi = (data) => api.put("/auth/profile", data);

// Orders endpoints
export const createOrderApi = (data) => api.post("/orders", data);
export const getOrdersApi = () => api.get("/orders");

export default api;
