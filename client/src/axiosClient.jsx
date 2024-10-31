import axios from "axios";
import { redirect } from "react-router-dom";

// Create axios instances with base URLs
export const axiosAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_AUTH_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
const addAuthInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Add response interceptor to handle common errors
const addResponseInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Handle unauthorized access
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          // redirect("/login");
        }

      
        console.error("API Error:", error.response.data);
      }
      return Promise.reject(error);
    }
  );
};

// Add interceptors to both instances
addAuthInterceptor(axiosAuth);
addAuthInterceptor(axiosApi);
addResponseInterceptor(axiosAuth);
addResponseInterceptor(axiosApi);
