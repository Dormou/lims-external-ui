// import type { FileMeta } from "./applicationStore";

// export type ValueType = 

//   | 'Integer' | 'Decimal' | 'String' 
//   | 'IntegerList' | 'DecimalList' | 'StringList' 
//   | 'Constant';

// export interface ParameterMeta {
//   parameterId: string;
//   parameterName: string;
//   parameterUnit?: string | null;
//   valueType: ValueType;
//   allowedValues?: string[];
//   maxValue?: string | null;
//   minValue?: string | null;
// }

// export interface TestMeta {
//   testId: string;
//   testName: string;
//   testMethod: string;
//   requirements: string;
// }

// export interface EquipmentTypeMeta {
//   equipmentTypeId: string;
//   equipmentTypeName: string;
//   parameters: ParameterMeta[];
//   tests: TestMeta[];
// }

// export interface BranchMeta {
//   branchId: string;
//   branchName: string;
//   equipmentTypes: EquipmentTypeMeta[];
// }

// export type ApplicationMetadataResponse = BranchMeta[];

// export interface ApplicationResponse {
//   id: string;
//   status: string;
//   updatedAt: string;
//   draft: {
//     branchId: string | null;
//     equipmentTypeId: string | null;
//     producerName: string | null;
//     producerAddress: string | null;
//     samples: any[]; // Дерево образцов, параметров и тестов
//   };
//   regulatoryDocument: FileMeta | null;
//   specification: FileMeta | null;
//   shema: FileMeta | null;
//   additionalDocuments: FileMeta[];
//   rawFile: FileMeta | null;
//   signedFile: FileMeta | null;
// }

