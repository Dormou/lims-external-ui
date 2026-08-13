import { Stack, FileInput, ScrollArea } from '@mantine/core'
import { Icon } from '@iconify/react'
import {
  useUploadAdditionalDocumentsMutation,
  useUploadRegulatoryDocumentMutation,
} from '@/features/create-application/api/createApplicationApi'
import { Controller, useFormContext } from 'react-hook-form'
import type { DraftFilesForm } from '../../model/draftFilesSchema'

// !!! Требует доработки универсальными компонентами файлов
export const DocsTab = ({ applicationId }: { applicationId: string }) => {
  const { setValue, control } = useFormContext<DraftFilesForm>()

  const [uploadRegulatory, { isLoading: isRegulatoryLoading }] =
    useUploadRegulatoryDocumentMutation()
  const [uploadAdditional, { isLoading: isAdditionalLoading }] =
    useUploadAdditionalDocumentsMutation()

  const handleRegulatoryFileChange = async (file: File | null) => {
    if (file) {
      try {
        // const response = await uploadRegulatory({
        //   id: applicationId,
        //   regulatoryDocument: file,
        // }).unwrap()

        // setValue('regulatoryDocument', response)

        setValue('regulatoryDocument', {
          applicationId: applicationId,
          fileName: file.name,
          fileExtension: '',
          fileSize: `${file.size / 1024} кБ`,
          createdAt: new Date(file.lastModified).toISOString(),
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAdditionalChange = async (files: File[] | null) => {
    if (files) {
      try {
        // const response = await uploadAdditional({
        //   id: applicationId,
        //   additionalDocuments: files,
        // }).unwrap()

        // setValue('additionalDocuments', response)
        setValue(
          'additionalDocuments',
          files.map((file) => ({
            applicationId: applicationId,
            fileName: file.name,
            fileExtension: '',
            fileSize: `${file.size / 1024} кБ`,
            createdAt: new Date(file.lastModified).toISOString(),
          }))
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <ScrollArea mt="md" offsetScrollbars="y" h="stretch" w="stretch">
      <Stack gap="xl" maw={600} mx="auto">
        <Controller
          name="regulatoryDocument"
          control={control}
          render={({ field: { value }, fieldState }) => (
            <FileInput
              label="Нормативный документ, в соответствии с которым изготовлен(-ы) объект(-ы) испытаний"
              required
              placeholder="Выберите файл"
              leftSection={<Icon icon="mdi:file-document-outline" width={20} />}
              value={value as any}
              onChange={handleRegulatoryFileChange}
              loading={isRegulatoryLoading}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="additionalDocuments"
          control={control}
          render={({ field: { value } }) => (
            <FileInput
              label="Дополнительные документы"
              placeholder="Можно выбрать несколько файлов"
              leftSection={<Icon icon="mdi:file-multiple-outline" width={20} />}
              multiple
              value={value as any}
              onChange={handleAdditionalChange}
              loading={isAdditionalLoading}
            />
          )}
        />
      </Stack>
    </ScrollArea>
  )
}
