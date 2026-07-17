import { Stack, FileInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { applicationsSlice } from '../applicationStore'

export const DocsTab = () => {
  const dispatch = useAppDispatch()

  const { regulatoryDocument, additionalDocuments } = useAppSelector(
    (state) => state.applicationsSlice
  )

  return (
    <Stack gap="xl" w="100%" maw={600} mx="auto">
      <FileInput
        label="Нормативный документ, в соответствии с которым изготовлен(-ы) объект(-ы) испытаний"
        required
        placeholder="Выберите файл"
        leftSection={<Icon icon="mdi:file-document-outline" width={20} />}
        value={regulatoryDocument}
        onChange={(file) =>
          dispatch(applicationsSlice.actions.setRegulatoryFile(file))
        }
        clearable
      />

      <FileInput
        label="Дополнительные документы"
        placeholder="Можно выбрать несколько файлов"
        leftSection={<Icon icon="mdi:file-multiple-outline" width={20} />}
        multiple
        value={additionalDocuments}
        onChange={(payload) =>
          dispatch(applicationsSlice.actions.setAdditionalFiles(payload))
        }
        clearable
      />
    </Stack>
  )
}
