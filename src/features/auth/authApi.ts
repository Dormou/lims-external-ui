import { apiClient } from "../../api/apiClient";

export const authApi = {
  login: (credentials: any) => apiClient.post("/auth/login", credentials),
  refresh: (refreshToken: string) =>
    apiClient.post("/auth/refresh", { refreshToken }),
  logout: () => apiClient.post("/auth/logout"),
  register: (data: any) => apiClient.post("/clients", data),
  recoverPassword: (email: string) =>
    apiClient.post("/auth/recover-password", { email }),
};
