import { apiClient } from "../../api/apiClient";

export const ApplicationApi = {
  getMetadata: async () => {
    const response = await apiClient.get("/references/application-info");
    return response.data;
  },

  createDraft: async () => {
    const response = await apiClient.post("/applications");
    return response.data;
  },

  saveDraft: async (payload: any) => {
    const formData = new FormData();

    formData.append("branchId", payload.branchId || "");
    formData.append("equipmentTypeId", payload.equipmentTypeId || "");
    formData.append("producerName", payload.producerName || "");
    formData.append("producerAddress", payload.producerAddress || "");

    const samples = payload.objects.map((obj: any) => {
      // Собираем параметры для данного объекта
      const parameterValues = Object.keys(payload.parameters).map(
        (paramId) => ({
          parameterId: paramId,
          parameterValue: payload.parameters[paramId]?.[obj.id] ?? null,
        }),
      );

      // Собираем тесты для данного объекта
      const testValues = Object.keys(payload.tests).map((testId) => ({
        testId: testId,
        testValue: payload.tests[testId]?.[obj.id] ?? false,
      }));

      return {
        name: obj.name || "",
        parameterValues: parameterValues,
        testValues: testValues,
      };
    });
    formData.append("samples", JSON.stringify(samples));

    if (payload.regulatoryDocument) {
      formData.append("regulatoryDocument", payload.regulatoryDocument);
    }
    if (payload.specification) {
      formData.append("specification", payload.specification);
    }
    if (payload.shema) {
      formData.append("shema", payload.shema);
    }

    payload.additionalDocuments?.forEach((file: File) => {
      formData.append("additionalDocuments", file);
    });

    const response = await apiClient.put(
      `/applications/${payload.applicationId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  generateApplication: async (applicationId: string) => {
    const response = await apiClient.post(
      `/applications/${applicationId}/form-file`,
    );
    return response.data;
  },

  uploadSignedFile: async (applicationId: string, file: File) => {
    const formData = new FormData();
    formData.append("signedFile", file);

    const response = await apiClient.post(
      `/applications/${applicationId}/signed-file`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  getAllApplications: async () => {
    const response = await apiClient.get("/applications");
    return response.data;
  },

  getApplicationById: async (applicationId: string) => {
  const response = await apiClient.get(`/applications/${applicationId}`);
  return response.data; 
},

  checkUserConfirmation: async () => {
    const response = await apiClient.get("/clients/confirmed");
    return response.data;
  },
};
