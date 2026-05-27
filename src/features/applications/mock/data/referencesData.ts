// import { v4 as uuidV4 } from 'uuid'
// import type { BranchMeta, ParameterMeta, TestMeta } from '../../types/Types'


// const generateParameters = (count: number): ParameterMeta[] => {
//   return Array.from({ length: count }, (_, i) => {
//     return {
//       parameterId: uuidV4(),
//       parameterName: `Параметр ${i}`,
//       parameterUnit: `ед.изм. ${i}`,
//       valueType: 'Integer',
//       minValue: '1',
//       maxValue: '5'
//     }
//   })
// }

// const generateTests = (count: number): TestMeta[] => {
//   return Array.from({ length: count }, (_, i) => {
//     return {
//       testId: uuidV4(),
//       testName: `Наименование теста ${i}`,
//       testMethod: 'ГОСТ 20248 р.4, 7, 13',
//       requirements: 'ГОСТ 14695-80 п. 2.1, 3.1, 3.7, 3.9, 3.11-3.13, 3.13.1, 3.16, 3.17, 3.19-3.22, 3.25-3.30, 3.30.2, 3.33, 4.1, 4.2, 7.1-7.7; приложение 2, подпункты 1, 3, 7, 8, 13-15, 18, 20',
//     }
//   })
// }

// export const BranchesData: BranchMeta[] = [
//   {
//     branchId: uuidV4(),
//     branchName: 'Филиал 1',
//     equipmentTypes: [
//       {
//         equipmentTypeId: uuidV4(),
//         equipmentTypeName: 'Тип 1 Ф1',
//         parameters: generateParameters(5),
//         tests: generateTests(2)
//       },
//       {
//         equipmentTypeId: uuidV4(),
//         equipmentTypeName: 'Тип 2 Ф1',
//         parameters: generateParameters(3),
//         tests: generateTests(1)
//       }
//     ]
//   },
//   {
//     branchId: uuidV4(),
//     branchName: 'Филиал 2',
//     equipmentTypes: [
//       {
//         equipmentTypeId: uuidV4(),
//         equipmentTypeName: 'Тип 1 Ф2',
//         parameters: generateParameters(4),
//         tests: generateTests(4)
//       },
//       {
//         equipmentTypeId: uuidV4(),
//         equipmentTypeName: 'Тип 2 Ф2',
//         parameters: generateParameters(2),
//         tests: generateTests(2)
//       },
//       {
//         equipmentTypeId: uuidV4(),
//         equipmentTypeName: 'Тип 3 Ф2',
//         parameters: generateParameters(10),
//         tests: generateTests(3)
//       }
//     ]
//   }
// ]

// export const ReferencesEquipmentTypes = BranchesData.map((info) => info.equipmentTypes).flat()