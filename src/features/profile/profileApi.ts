import { apiClient } from "../../api/apiClient";

export const profileApi = {
  getProfile: () => apiClient.get("/clients/me"),
  updateUser: (data: any) => apiClient.put("/clients/me", data),

  updateOrganization: (data: any) =>
    apiClient.put("/clients/me/organization", data),

  updateHead: (data: any) => apiClient.put("/clients/me/head", data),

  updateTechContact: (data: any) =>
    apiClient.put("/clients/me/tech-contact", data),
  
  changePassword: (passwords: any) =>
    apiClient.post("/auth/change-password", passwords),
};
