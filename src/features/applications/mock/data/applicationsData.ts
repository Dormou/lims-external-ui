// import { v4 as uuidV4 } from 'uuid'
// import { fakerRU as faker } from '@faker-js/faker'
// import { BranchesData } from './referencesData'
// import type { Application } from '../../types/Types'

// export const ApplicationsData: Application[] = [
//   {
//     id: uuidV4(),
//     branchId: BranchesData[0].branchId,
//     equipmentTypeId: BranchesData[0].equipmentTypes[0].equipmentTypeId,
//     producerName: faker.company.name(),
//     producerAddress: `г. ${faker.location.city()}, ${faker.location.streetAddress({ useFullAddress: true })}`,
//     samples: ['Объект испытаний №1', 'Объект испытаний №2'],
//     parameters: BranchesData[0].equipmentTypes[0].parameters.map((param, i) => {
//       return {
//         parameterId: param.parameterId,
//         parameterValues: [`Значение ${i}`]
//       }
//     }),
//     tests: BranchesData[0].equipmentTypes[0].tests.map((test) => {
//       return {
//         testId: test.testId,
//         hasAdditionalRequirements: false,
//         samples: []
//       }
//     }),
//     // Файлы
//     regulatoryDocument: null,
//     specification: null,
//     shema: null,
//     additionalDocuments: [],
//     rawFile: null,
//     signedFile: null
//   },
//   {
//     id: uuidV4(),
//     branchId: BranchesData[0].branchId,
//     equipmentTypeId: BranchesData[0].equipmentTypes[0].equipmentTypeId,
//     producerName: faker.company.name(),
//     producerAddress: `г. ${faker.location.city()}, ${faker.location.streetAddress({ useFullAddress: true })}`,
//     samples: ['Объект испытаний №1', 'Объект испытаний №2'],
//     parameters: BranchesData[0].equipmentTypes[0].parameters.map((param, i) => {
//       return {
//         parameterId: param.parameterId,
//         parameterValues: [`Значение ${i}`]
//       }
//     }),
//     tests: BranchesData[0].equipmentTypes[0].tests.map((test) => {
//       return {
//         testId: test.testId,
//         hasAdditionalRequirements: false,
//         samples: []
//       }
//     }),
//     // Файлы
//     regulatoryDocument: null,
//     specification: null,
//     shema: null,
//     additionalDocuments: [],
//     rawFile: null,
//     signedFile: null
//   },
// ]