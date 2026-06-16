import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidV4 } from 'uuid'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  FileMeta,
  TestingObject,
} from '../../api/applications/types/types'

export type ApplicationTabs = 'general' | 'params' | 'tests' | 'docs'

interface ApplicationsSliceState {
  currentStep: number // 0: Преформа, 1: Форма с табами, 2: Подпись, 3: Финал
  activeTab: ApplicationTabs // Активная вкладка внутри формы
  isUserConfirmed: boolean

  applicationId: string | null
  branchId: string
  equipmentTypeId: string
  producerName: string
  producerAddress: string
  objects: TestingObject[]

  // [paramId]: { [objectId]: value }
  parameters: Record<string, Record<string, string>>
  // [testId]: { [objectId]: boolean }
  tests: Record<string, Record<string, boolean>>

  regulatoryDocument: File | null
  additionalDocuments: File[]

  generatedFile: FileMeta | null
  signedFile: File | null
  signedFileMeta: FileMeta | null
}

const initialState: ApplicationsSliceState = {
  currentStep: 0,
  activeTab: 'general',
  isUserConfirmed: false,

  applicationId: null,
  branchId: '',
  equipmentTypeId: '',
  producerName: '',
  producerAddress: '',
  objects: [{ id: uuidV4(), name: '' }],

  parameters: {},
  tests: {},

  regulatoryDocument: null,
  additionalDocuments: [],

  generatedFile: null,
  signedFile: null,
  signedFileMeta: null,
}

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    setActiveTab: (state, action: PayloadAction<ApplicationTabs>) => {
      state.activeTab = action.payload
    },
    setApplicationId: (state, action: PayloadAction<string>) => {
      state.applicationId = action.payload
    },
    updateGeneral: (
      state,
      action: PayloadAction<{
        value: string
        param:
          | 'branchId'
          | 'equipmentTypeId'
          | 'producerName'
          | 'producerAddress'
      }>
    ) => {
      state[action.payload.param] = action.payload.value
    },
    setIsUserConfirmed: (state, action: PayloadAction<boolean>) => {
      state.isUserConfirmed = action.payload
    },

    // Работа с объектами (Вкладка 1)
    addObject: (state) => {
      if (state.objects.length < 11)
        state.objects.push({ id: uuidV4(), name: '' })
    },
    removeObject: (state, action: PayloadAction<string>) => {
      state.objects = state.objects.filter((obj) => obj.id !== action.payload)
    },
    updateObjectName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const foundObj = state.objects.find((obj) => obj.id === action.payload.id)
      if (foundObj) foundObj.name = action.payload.name
    },

    // Работа с таблицами (Вкладки 2 и 3)
    setParameterValue: (
      state,
      action: PayloadAction<{ paramId: string; objId: string; value: string }>
    ) => {
      state.parameters = {
        ...state.parameters,
        [action.payload.paramId]: {
          ...(state.parameters[action.payload.paramId] || {}),
          [action.payload.objId]: action.payload.value,
        },
      }
    },
    setTestValue: (
      state,
      action: PayloadAction<{ testId: string; objId: string; value: boolean }>
    ) => {
      state.tests = {
        ...state.tests,
        [action.payload.testId]: {
          ...(state.tests[action.payload.testId] || {}),
          [action.payload.objId]: action.payload.value,
        },
      }
    },

    setRegulatoryFile: (state, action: PayloadAction<File | null>) => {
      state.regulatoryDocument = action.payload
    },
    setAdditionalFiles: (state, action: PayloadAction<File[]>) => {
      state.additionalDocuments = action.payload
    },
    setSignedFile: (state, action: PayloadAction<File | null>) => {
      state.signedFile = action.payload
    },
    setGeneratedFile: (state, action: PayloadAction<FileMeta | null>) => {
      state.generatedFile = action.payload
    },
    setSignedFileMeta: (state, action: PayloadAction<FileMeta | null>) => {
      state.signedFileMeta = action.payload
    },

    loadApplicationData: (state, action: PayloadAction<any>) => {
      const draftData = action.payload.draft || {
        branchId: '',
        equipmentTypeId: '',
        producerName: '',
        producerAddress: '',
        samples: [],
      }

      const objects = (draftData.samples || []).map(
        (sample: any, idx: number) => ({
          id: `loaded-obj-${idx}`,
          name: sample.name || '',
        })
      )

      const parameters: Record<string, Record<string, string>> = {}
      const tests: Record<string, Record<string, boolean>> = {}

      ;(draftData.samples || []).forEach((sample: any, sampleIdx: number) => {
        const objId = `loaded-obj-${sampleIdx}`

        sample.parameterValues?.forEach((pv: any) => {
          if (!parameters[pv.parameterId]) parameters[pv.parameterId] = {}
          parameters[pv.parameterId][objId] = pv.parameterValue || ''
        })

        sample.testValues?.forEach((tv: any) => {
          if (!tests[tv.testId]) tests[tv.testId] = {}
          tests[tv.testId][objId] = tv.testValue || false
        })
      })

      let targetStep = 1
      if (action.payload.status === 'Сформирована') targetStep = 2
      if (action.payload.status === 'Отправлена') targetStep = 3

      state.applicationId = action.payload.id
      state.currentStep = targetStep
      state.branchId = draftData.branchId || ''
      state.equipmentTypeId = draftData.equipmentTypeId || ''
      state.producerName = draftData.producerName || ''
      state.producerAddress = draftData.producerAddress || ''
      state.objects =
        objects.length > 0 ? objects : [{ id: crypto.randomUUID(), name: '' }]
      state.parameters = parameters
      state.tests = tests

      state.generatedFile = action.payload.rawFile
      state.signedFileMeta = action.payload.signedFile

      state.regulatoryDocument = action.payload.regulatoryDocument
        ? new File([], action.payload.regulatoryDocument.fileName)
        : null
    },
    reset: (state) => {
      state = { ...state, ...initialState }
    },
  },
})

export default applicationsSlice.reducer
