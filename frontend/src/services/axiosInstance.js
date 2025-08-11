// src/api/axiosInstance.js
import axios from "axios";

const baseURL = "http://localhost:8000/api/";

let accessToken = localStorage.getItem("access");
let refreshToken = localStorage.getItem("refresh");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
});

// Request Interceptor - Always attach the latest access token
axiosInstance.interceptors.request.use(
  (config) => {
    accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("[Axios] Sending request to:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.warn("[Axios] Access token expired, trying refresh...");

      try {
        refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
          console.error("[Axios] No refresh token found, logging out.");
          // You might want to redirect to login here
          return Promise.reject(error);
        }

        const refreshResponse = await axios.post(`${baseURL}token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = refreshResponse.data.access;
        console.log("[Axios] New access token:", newAccess);

        localStorage.setItem("access", newAccess);
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccess}`;

        // Log headers before retrying
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        console.log("[Axios] Retrying request with headers:", originalRequest.headers);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("[Axios] Refresh failed, logging out.", refreshError);
        // Handle logout logic here if needed
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
