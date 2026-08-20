import { z } from 'zod'
import { valueTypeList } from '@/entities/metadata/model/valueType'

const sampleParameterSchema = z
  .object({
    // Параметры из метаданных
    parameterId: z.string(),
    valueType: z.enum(valueTypeList),
    minValue: z.number().nullable().optional(),
    maxValue: z.number().nullable().optional(),
    // Редактируемое значение
    parameterValue: z.string().nullable(),
  })
  .superRefine(({ valueType, parameterValue, minValue, maxValue }, ctx) => {
    const setError = (message: string) => {
      ctx.addIssue({
        code: 'custom',
        message: message,
        path: ['parameterValue'],
      })
    }

    // Пустое значение
    if (!parameterValue) {
      setError('Параметр не может быть пустым')
      return
    }
    // Integer
    if (valueType === 'Integer') {
      const num = Number(parameterValue)
      // Проверка на тип
      if (Number.isNaN(num) || !Number.isInteger(num)) {
        setError('Ожидается целое число')
        return
      }
      // Минимальное значение
      if (minValue || minValue === 0) {
        if (num < minValue) {
          setError(`Минимальное значение: ${minValue}`)
          return
        }
      }
      // Максимальное значение
      if (maxValue || maxValue === 0) {
        if (num > maxValue) {
          setError(`Максимальное значение: ${maxValue}`)
          return
        }
      }
    }
    // Decimal
    if (valueType === 'Decimal') {
      const num = Number(parameterValue)
      // Проверка на тип
      if (Number.isNaN(num)) {
        setError('Ожидается число')
        return
      }
      // Минимальное значение
      if (minValue || minValue === 0) {
        if (num < minValue) {
          setError(`Минимальное значение: ${minValue}`)
          return
        }
      }
      // Максимальное значение
      if (maxValue || maxValue === 0) {
        if (num > maxValue) {
          setError(`Максимальное значение: ${maxValue}`)
          return
        }
      }
    }
    // String
    if (valueType === 'String') {
      if (minValue && parameterValue.length < minValue) {
        setError(`Минимальная длина строки: ${minValue}`)
        return
      }
      if (maxValue && parameterValue.length > maxValue) {
        setError(`Максимальная длина строки: ${maxValue}`)
        return
      }
    }
  })

const sampleTestSchema = z.object({
  testId: z.string(),
  testValue: z.boolean(),
})

const sampleSchema = z.object({
  name: z.string().min(1, 'Наименование не может быть пустым'),
  parameterValues: z.array(sampleParameterSchema),
  testValues: z.array(sampleTestSchema),
})

export const draftSchema = z.object({
  branchId: z
    .string()
    .nullable()
    .refine(
      (value) => value !== null && value.trim().length > 0,
      'Филиал является обязательным полем'
    ),
  equipmentTypeId: z
    .string()
    .nullable()
    .refine(
      (value) => value !== null && value.trim().length > 0,
      'Тип устройства является обязательным полем'
    ),
  producerName: z.string().min(1, 'Наименование не может быть пустым'),
  producerAddress: z.string().min(1, 'Адрес не может быть пустым'),
  samples: z
    .array(sampleSchema)
    .nonempty('Укажите хотя бы один объект испытаний'),
})

export type DraftForm = z.infer<typeof draftSchema>
export type SampleForm = z.infer<typeof sampleSchema>
export type SampleParameterForm = z.infer<typeof sampleParameterSchema>
export type SampleTestForm = z.infer<typeof sampleTestSchema>

// Схема для загрузки данных с бэка
export const draftLoadingSchema = z.object({
  branchId: z.string().nullable(),
  equipmentTypeId: z.string().nullable(),
  producerName: z.string().catch(''),
  producerAddress: z.string().catch(''),
  samples: z.array(
    z.object({
      name: z.string().catch(''),
      parameterValues: z.array(
        z.object({
          parameterId: z.string(),
          parameterValue: z.string(),
        })
      ),
      testValues: z.array(
        z.object({
          testId: z.string(),
          testValue: z.boolean(),
        })
      ),
    })
  ),
})
