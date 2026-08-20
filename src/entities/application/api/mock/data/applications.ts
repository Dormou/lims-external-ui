import { formatDate } from '@/shared/lib'
import type { Application } from '../../../model/types/application'

const IS_EMPTY_DATA = false

export const ApplicationsMockData: Application[] = IS_EMPTY_DATA
  ? []
  : [
      // Черновая заявка
      {
        id: '4dc2a8b2-d057-423f-a861-e11af8b2d92e',
        status: 'Черновик',
        updatedAt: new Date().toISOString(),
        draft: {
          branchId: '850098b9-6000-4567-9778-a8c027a19be2',
          equipmentTypeId: '6924d505-055e-4138-9af2-a4f3e4390b06',
          producerName: 'Предприятие Черновик',
          producerAddress: 'Адрес Черновик',
          samples: [
            {
              name: 'Объект испытаний Черновик',
              parameterValues: [
                {
                  parameterId: '98fe4820-1b09-42bd-aa72-181c583bcbca',
                  parameterValue: 'Константа Черновик',
                },
                {
                  parameterId: '488598b5-14f8-4503-bf69-e8894f164bfb',
                  parameterValue: '5',
                },
              ],
              testValues: [
                {
                  testId: 'c1e23054-8b10-47d1-b373-87cbc4c7b06a',
                  testValue: true,
                },
              ],
            },
          ],
        },
        regulatoryDocument: null,
        additionalDocuments: [],
        rawFile: null,
        signedFile: null,
      },
      // Сформированная заявка
      {
        id: 'df04d0c6-fb0f-4856-8a67-9eeaaa74e514',
        status: 'Сформирована',
        updatedAt: new Date().toISOString(),
        draft: {
          branchId: '850098b9-6000-4567-9778-a8c027a19be2',
          equipmentTypeId: '365572b3-a878-433e-8ac5-2791ca97cf7a',
          producerName: 'Предприятие Сформировано',
          producerAddress: 'Адрес Сформировано',
          samples: [
            {
              name: 'Объект испытаний Сформировано',
              parameterValues: [
                {
                  parameterId: '188a7f71-528c-4eab-b7eb-519cbaed9fab',
                  parameterValue: 'Константа Сформировано',
                },
                {
                  parameterId: '34c79f84-b1e1-46ae-b30c-a81972629b22',
                  parameterValue: '5.1',
                },
                {
                  parameterId: 'a0b292f3-695f-49f5-bebe-b2f2118eb0ad',
                  parameterValue: '2.5',
                },
                {
                  parameterId: '694c530a-2958-424a-bc26-47ffd4545d6e',
                  parameterValue: '7',
                },
                {
                  parameterId: 'bfe5c752-298a-47b9-8403-5636a3875306',
                  parameterValue: '2',
                },
                {
                  parameterId: '1ba3d0be-80f4-4dfd-9cb0-66820859046b',
                  parameterValue: 'Текст Сформировано',
                },
                {
                  parameterId: '928eba06-4883-4793-84e5-3f091cf4ed9c',
                  parameterValue: 'Значение 3',
                },
              ],
              testValues: [
                {
                  testId: 'b4a3798b-95ac-4c21-9d47-76a7193fc497',
                  testValue: true,
                },
                {
                  testId: '4b6b8241-54c9-41ec-8ce3-d2ea6514f36f',
                  testValue: true,
                },
              ],
            },
          ],
        },
        regulatoryDocument: {
          applicationId: 'df04d0c6-fb0f-4856-8a67-9eeaaa74e514',
          fileName: 'Нормативный документ.docx',
          fileExtension: '.docx',
          fileSize: '11.7KB',
          createdAt: new Date().toISOString(),
        },
        additionalDocuments: [
          {
            applicationId: 'df04d0c6-fb0f-4856-8a67-9eeaaa74e514',
            fileName: 'Доп документ 1.docx',
            fileExtension: '.docx',
            fileSize: '23.3KB',
            createdAt: new Date().toISOString(),
          },
          {
            applicationId: 'df04d0c6-fb0f-4856-8a67-9eeaaa74e514',
            fileName: 'Доп документ 2.docx',
            fileExtension: '.docx',
            fileSize: '15.6KB',
            createdAt: new Date().toISOString(),
          },
        ],
        rawFile: {
          applicationId: 'df04d0c6-fb0f-4856-8a67-9eeaaa74e514',
          fileName: `Заявка на испытания от Предприятие от ${formatDate(new Date().toISOString())}.docx`,
          fileExtension: '.docx',
          fileSize: '52.9KB',
          createdAt: new Date().toISOString(),
        },
        signedFile: null,
      },
      // Отправленная заявка
      {
        id: '6eab5112-e891-44d1-b373-fef65a82bebb',
        status: 'Отправлена',
        updatedAt: new Date().toISOString(),
        draft: {
          branchId: 'cedf82ea-69e5-4554-9fed-9a28f65c0cbb',
          equipmentTypeId: '374906af-c936-4f67-9ecb-d0ee14954cae',
          producerName: 'Предприятие Отправлено',
          producerAddress: 'Адрес Отправлено',
          samples: [
            {
              name: 'Объект испытаний Отправлено',
              parameterValues: [
                {
                  parameterId: '72de3042-29e9-4fba-9920-de60c0743989',
                  parameterValue: 'Константа Отправлено',
                },
                {
                  parameterId: '0cbf80e1-75e5-4480-9b22-50b1c4f7b72a',
                  parameterValue: '7.3',
                },
                {
                  parameterId: 'be89b61d-f866-4b7c-883f-25208159ffcc',
                  parameterValue: '1.2',
                },
                {
                  parameterId: '0e19a1c5-5c2f-413d-b8d4-270b5da59677',
                  parameterValue: '6',
                },
                {
                  parameterId: '49cdd6a1-e4f3-475f-b332-e142116aead3',
                  parameterValue: '3',
                },
                {
                  parameterId: 'e92cf241-9137-4a2b-b733-0cf5ac1195d1',
                  parameterValue: 'Текст Отправлено',
                },
                {
                  parameterId: 'a9177fae-d349-4049-8d5a-812f3b0a5b7d',
                  parameterValue: 'Значение 1',
                },
              ],
              testValues: [
                {
                  testId: '0776fee9-7711-4476-ac5d-2033bf208af6',
                  testValue: true,
                },
                {
                  testId: '1fd52571-7887-4cdf-a866-51257ea7e33a',
                  testValue: true,
                },
              ],
            },
          ],
        },
        regulatoryDocument: {
          applicationId: '6eab5112-e891-44d1-b373-fef65a82bebb',
          fileName: 'Нормативный документ.docx',
          fileExtension: '.docx',
          fileSize: '15.7KB',
          createdAt: new Date().toISOString(),
        },
        additionalDocuments: [],
        rawFile: {
          applicationId: '6eab5112-e891-44d1-b373-fef65a82bebb',
          fileName: `Заявка на испытания от Предприятие от ${formatDate(new Date().toISOString())}.docx`,
          fileExtension: '.docx',
          fileSize: '36.1KB',
          createdAt: new Date().toISOString(),
        },
        signedFile: {
          applicationId: '6eab5112-e891-44d1-b373-fef65a82bebb',
          fileName: `Заявка на испытания от Предприятие от ${formatDate(new Date().toISOString())}.docx`,
          fileExtension: '.docx',
          fileSize: '36.5KB',
          createdAt: new Date().toISOString(),
        },
      },
    ]
