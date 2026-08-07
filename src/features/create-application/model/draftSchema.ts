import { z } from 'zod'

const sampleParameterSchema = z.object({
  parameterId: z.string(),
  parameterValue: z
    .string()
    .min(
      1,
      'Введите все значения параметров в разделе Характеристики объектов испытаний'
    ),
})

const sampleTestSchema = z.object({
  testId: z.string(),
  testValue: z.boolean(),
})

const sampleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Введите наименование объекта'),
  parameterValues: z.array(sampleParameterSchema),
  testValues: z.array(sampleTestSchema),
})

export const draftSchema = z.object({
  branchId: z.string().min(1, 'Выберите филиал'),
  equipmentTypeId: z.string().min(1, 'Выберите тип устройства'),
  producerName: z
    .string()
    .min(1, 'Введите наименование предприятия-изготовителя'),
  producerAddress: z
    .string()
    .min(1, 'Введите адрес производственной площадки изготовителя'),
  samples: z
    .array(sampleSchema)
    .nonempty('Укажите хотя бы один объект испытаний'),
})

export type DraftForm = z.infer<typeof draftSchema>
export type SampleForm = z.infer<typeof sampleSchema>
export type SampleParameterForm = z.infer<typeof sampleParameterSchema>
export type SampleTestForm = z.infer<typeof sampleTestSchema>
