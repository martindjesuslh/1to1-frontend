import axios from "axios";
import type { ApiResponse } from "@/interfaces/api.interface";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const axiosInstance = {
  get: <T>(url: string, config?: any) => instance.get<any, ApiResponse<T>>(url, config),
  post: <T>(url: string, data?: any, config?: any) => instance.post<any, ApiResponse<T>>(url, data, config),
  patch: <T>(url: string, data?: any, config?: any) => instance.patch<any, ApiResponse<T>>(url, data, config),
  put: <T>(url: string, data?: any, config?: any) => instance.put<any, ApiResponse<T>>(url, data, config),
  delete: <T>(url: string, config?: any) => instance.delete<any, ApiResponse<T>>(url, config),
};

export default axiosInstance;
