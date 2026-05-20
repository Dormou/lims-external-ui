import axios from "axios";
import { useAuthStore } from "../features/auth/authStore";

export const apiClient = axios.create({
  // baseURL: "http://localhost:5287/api", // local dev
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Перехват 401 для обновления токена
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, setAuth, logout } = useAuthStore.getState();

      try {
        const { data } = await axios.post("/api/auth/refresh", {
          refreshToken,
        });
        setAuth(data);
        return apiClient(originalRequest);
      } catch (e) {
        logout();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);
