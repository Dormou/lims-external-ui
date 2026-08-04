import { useDispatch, useSelector } from 'react-redux'
import { Stack, FileInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import {
  setAdditionalFiles,
  setRegulatoryFile,
} from '../../model/createApplicationSlice'

export const DocsTab = () => {
  const dispatch = useDispatch()

  const { regulatoryDocument, additionalDocuments } = useSelector(
    (state) => state.createApplication
  )

  return (
    <Stack gap="xl" w="100%" maw={600} mx="auto">
      <FileInput
        label="Нормативный документ, в соответствии с которым изготовлен(-ы) объект(-ы) испытаний"
        required
        placeholder="Выберите файл"
        leftSection={<Icon icon="mdi:file-document-outline" width={20} />}
        value={regulatoryDocument}
        onChange={(file) => dispatch(setRegulatoryFile(file))}
        clearable
      />

      <FileInput
        label="Дополнительные документы"
        placeholder="Можно выбрать несколько файлов"
        leftSection={<Icon icon="mdi:file-multiple-outline" width={20} />}
        multiple
        value={additionalDocuments}
        onChange={(payload) => dispatch(setAdditionalFiles(payload))}
        clearable
      />
    </Stack>
  )
}
