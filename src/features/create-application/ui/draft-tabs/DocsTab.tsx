import { Stack, FileInput, ScrollArea } from '@mantine/core'
import { Icon } from '@iconify/react'
import {
  useUploadAdditionalDocumentsMutation,
  useUploadRegulatoryDocumentMutation,
} from '@/features/create-application/api/createApplicationApi'
import { useGetApplication } from '../../lib/useGetApplication'

// !!! Требует доработки универсальными компонентами файлов
export const DocsTab = () => {
  const { applicationData } = useGetApplication()

  const [uploadRegulatory, { isLoading: isRegulatoryLoading }] =
    useUploadRegulatoryDocumentMutation()
  const [uploadAdditional, { isLoading: isAdditionalLoading }] =
    useUploadAdditionalDocumentsMutation()

  const handleRegulatoryFileChange = async (file: File | null) => {
    if (file && applicationData) {
      try {
        await uploadRegulatory({
          id: applicationData.id,
          regulatoryDocument: file,
        }).unwrap()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAdditionalChange = async (files: File[] | null) => {
    if (files && applicationData) {
      try {
        await uploadAdditional({
          id: applicationData.id,
          additionalDocuments: files,
        }).unwrap()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <ScrollArea mt="xl">
      <Stack gap="xl" w="100%" maw={600} mx="auto">
        <FileInput
          label="Нормативный документ, в соответствии с которым изготовлен(-ы) объект(-ы) испытаний"
          required
          placeholder="Выберите файл"
          leftSection={<Icon icon="mdi:file-document-outline" width={20} />}
          value={applicationData?.regulatoryDocument as any}
          onChange={handleRegulatoryFileChange}
          loading={isRegulatoryLoading}
        />

        <FileInput
          label="Дополнительные документы"
          placeholder="Можно выбрать несколько файлов"
          leftSection={<Icon icon="mdi:file-multiple-outline" width={20} />}
          multiple
          value={applicationData?.additionalDocuments as any}
          onChange={handleAdditionalChange}
          loading={isAdditionalLoading}
        />
      </Stack>
    </ScrollArea>
  )
}
