import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ApplicationApi } from "./applicationApi";
import type {
  ApplicationResponse,
  BranchMeta,
  EquipmentTypeMeta,
} from "./applicationTypes";

interface ParameterMeta {
  parameterId: string;
  parameterName: string;
  parameterUnit: string | null;
  valueType: string;
  allowedValues?: string[];
  minValue?: string | null;
  maxValue?: string | null;
}

interface TestMeta {
  testId: string;
  testName: string;
  testMethod: string;
}

export interface TestingObject {
  id: string;
  name: string;
}

export interface FileMeta {
  applicationId: string;
  fileName: string;
  fileExtension: string;
  fileSize: string;
  createdAt: string;
}

interface ApplicationState {
  // Состояние навигации
  currentStep: number; // 0: Преформа, 1: Форма с табами, 2: Подпись, 3: Финал
  activeTab: string; // Активная вкладка внутри формы ('general', 'params', 'tests', 'docs')

  metadata: BranchMeta[];

  applicationId: string | null;
  branchId: string;
  equipmentTypeId: string;
  producerName: string;
  producerAddress: string;
  objects: TestingObject[];

  isLoading: boolean;
  isUserConfirmed: boolean;

  // [paramId]: { [objectId]: value }
  parameters: Record<string, Record<string, string>>;
  // [testId]: { [objectId]: boolean }
  tests: Record<string, Record<string, boolean>>;

  regulatoryDocument: File | null;
  specification: File | null;
  shema: File | null;
  additionalDocuments: File[];

  generatedFile: FileMeta | null;
  signedFile: File | null;
  signedFileMeta: FileMeta | null;

  setStep: (step: number) => void;
  setActiveTab: (tab: string) => void;

  fetchMetadata: () => Promise<void>;
  setMetadata: (data: BranchMeta[]) => void;

  setApplicationId: (id: string) => void;

  updateGeneral: (
    data: Partial<{
      branchId: string;
      equipmentTypeId: string;
      producerName: string;
      producerAddress: string;
    }>,
  ) => void;

  // Работа с объектами (Вкладка 1)
  addObject: () => void;
  removeObject: (id: string) => void;
  updateObjectName: (id: string, name: string) => void;

  // Работа с таблицами (Вкладки 2 и 3)
  setParameterValue: (paramId: string, objId: string, value: string) => void;
  setTestValue: (testId: string, objId: string, value: boolean) => void;

  setFile: (
    field: "regulatoryDocument" | "specification" | "shema",
    file: File | null,
  ) => void;
  setAdditionalFiles: (files: File[]) => void;

  setSignedFile: (file: File | null) => void;
  setGeneratedFile: (file: FileMeta | null) => void;
  setSignedFileMeta: (file: FileMeta | null) => void;

  setIsUserConfirmed: (confirmed: boolean) => void;

  loadApplicationData: (data: any) => void;

  reset: () => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  currentStep: 0,
  activeTab: "general",
  metadata: [],
  applicationId: null,
  branchId: "",
  equipmentTypeId: "",
  producerName: "",
  producerAddress: "",
  objects: [{ id: uuidv4(), name: "" }],
  parameters: {},
  tests: {},
  regulatoryDocument: null,
  specification: null,
  shema: null,
  additionalDocuments: [],
  isLoading: false,
  generatedFile: null,
  signedFile: null,
  signedFileMeta: null,
  isUserConfirmed: false,

  setStep: (step) => set({ currentStep: step }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  fetchMetadata: async () => {
    set({ isLoading: true });
    try {
      const data = await ApplicationApi.getMetadata();
      set({ metadata: data, isLoading: false });
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      set({ isLoading: false });
    }
  },

  setMetadata: (data) => set({ metadata: data }),

  setApplicationId: (id) => set({ applicationId: id }),

  updateGeneral: (data) => set((state) => ({ ...state, ...data })),

  addObject: () =>
    set((state) => {
      if (state.objects.length >= 12) return state;
      return {
        objects: [...state.objects, { id: uuidv4(), name: "" }],
      };
    }),

  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
    })),

  updateObjectName: (id, name) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, name } : obj,
      ),
    })),

  setParameterValue: (paramId, objId, value) =>
    set((state) => ({
      parameters: {
        ...state.parameters,
        [paramId]: {
          ...(state.parameters[paramId] || {}),
          [objId]: value,
        },
      },
    })),

  setTestValue: (testId, objId, value) =>
    set((state) => ({
      tests: {
        ...state.tests,
        [testId]: {
          ...(state.tests[testId] || {}),
          [objId]: value,
        },
      },
    })),

  setFile: (field, file) => set({ [field]: file }),
  setAdditionalFiles: (files) => set({ additionalDocuments: files }),

  setSignedFile: (file) => set({ signedFile: file }),
  setGeneratedFile: (file) => set({ generatedFile: file }),
  setSignedFileMeta: (file) => set({ signedFileMeta: file }),
  setIsUserConfirmed: (confirmed) => set({ isUserConfirmed: confirmed }),

  loadApplicationData: (data: ApplicationResponse) =>
    set((state) => {
      const draftData = data.draft || {
        branchId: "",
        equipmentTypeId: "",
        producerName: "",
        producerAddress: "",
        samples: [],
      };

      const objects = (draftData.samples || []).map(
        (sample: any, idx: number) => ({
          id: `loaded-obj-${idx}`,
          name: sample.name || "",
        }),
      );

      const parameters: Record<string, Record<string, string>> = {};
      const tests: Record<string, Record<string, boolean>> = {};

      (draftData.samples || []).forEach((sample: any, sampleIdx: number) => {
        const objId = `loaded-obj-${sampleIdx}`;

        sample.parameterValues?.forEach((pv: any) => {
          if (!parameters[pv.parameterId]) parameters[pv.parameterId] = {};
          parameters[pv.parameterId][objId] = pv.parameterValue || "";
        });

        sample.testValues?.forEach((tv: any) => {
          if (!tests[tv.testId]) tests[tv.testId] = {};
          tests[tv.testId][objId] = tv.testValue || false;
        });
      });

      let targetStep = 1;
      if (data.status === "Сформирована") targetStep = 2;
      if (data.status === "Отправлена") targetStep = 3;

      return {
        applicationId: data.id,
        currentStep: targetStep,
        branchId: draftData.branchId || "",
        equipmentTypeId: draftData.equipmentTypeId || "",
        producerName: draftData.producerName || "",
        producerAddress: draftData.producerAddress || "",
        objects:
          objects.length > 0
            ? objects
            : [{ id: crypto.randomUUID(), name: "" }],
        parameters,
        tests,

        generatedFile: data.rawFile,
        signedFileMeta: data.signedFile,

        regulatoryDocument: data.regulatoryDocument
          ? new File([], data.regulatoryDocument.fileName)
          : null,
        specification: data.specification
          ? new File([], data.specification.fileName)
          : null,
        shema: data.shema ? new File([], data.shema.fileName) : null, // Используем скорректированный ключ
      };
    }),

  reset: () =>
    set({
      currentStep: 0,
      activeTab: "general",
      branchId: "",
      equipmentTypeId: "",
      producerName: "",
      producerAddress: "",
      objects: [{ id: uuidv4(), name: "" }],
      parameters: {},
      tests: {},
      regulatoryDocument: null,
      specification: null,
      shema: null,
      additionalDocuments: [],
      isLoading: false,
      generatedFile: null,
      signedFile: null,
      signedFileMeta: null,
      isUserConfirmed: false,
    }),
}));

export const getActiveMetadata = (state: ApplicationState) => {
  const branch = state.metadata.find((b) => b.branchId === state.branchId);
  const equipment = branch?.equipmentTypes.find(
    (t: EquipmentTypeMeta) => t.equipmentTypeId === state.equipmentTypeId,
  );

  return {
    parameters: (equipment?.parameters || []) as ParameterMeta[],
    tests: (equipment?.tests || []) as TestMeta[],
  };
};

export const validateField = (value: string, param: ParameterMeta): boolean => {
  const { valueType, minValue, maxValue } = param;
  if (!value) return false;

  const numValue = Number(value.replace(",", "."));
  if (valueType === "Integer" || valueType === "Decimal") {
    if (isNaN(numValue)) return false;
    if (minValue && numValue < Number(minValue)) return false;
    if (maxValue && numValue > Number(maxValue)) return false;
  }
  if (valueType === "String") {
    if (minValue && value.length < Number(minValue)) return false;
    if (maxValue && value.length > Number(maxValue)) return false;
  }
  return true;
};

export const useIsFormValid = () => {
  const state = useApplicationStore();
  const {
    parameters,
    objects,
    branchId,
    equipmentTypeId,
    producerName,
    producerAddress,
    regulatoryDocument,
    specification,
    shema,
    isUserConfirmed,
  } = state;
  const { parameters: metaParams } = getActiveMetadata(state);

  // Проверяем General Info
  const isGeneralValid =
    !!branchId && !!equipmentTypeId && !!producerName && !!producerAddress;

  // Проверяем, что у всех объектов есть имена
  const areObjectsNamed = objects.every((obj) => obj.name.trim().length > 0);

  // Проверяем таблицу параметров
  const areParametersValid = metaParams.every((param) =>
    objects.every((obj) => {
      const val = parameters[param.parameterId]?.[obj.id] || "";
      return validateField(val, param);
    }),
  );

  // Проверяем наличие обязательных документов
  const areDocumentsValid = !!regulatoryDocument && !!specification && !!shema;

  return (
    isGeneralValid &&
    areObjectsNamed &&
    areParametersValid &&
    areDocumentsValid &&
    isUserConfirmed
  );
};
