import { z } from 'zod'

const fileMetaSchema = z.object({
  applicationId: z.string(),
  fileName: z.string(),
  fileExtension: z.string(),
  fileSize: z.string(),
  createdAt: z.string(),
})

export const draftFilesSchema = z
  .object({
    regulatoryDocument: fileMetaSchema.nullable(),
    additionalDocuments: z.array(fileMetaSchema).nullable(),
  })
  .superRefine(({ regulatoryDocument }, ctx) => {
    if (regulatoryDocument === null) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пожалуйста, загрузите нормативный документ',
        path: ['regulatoryDocument'],
      })
    }
  })

export type DraftFilesForm = z.infer<typeof draftFilesSchema>
