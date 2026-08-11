import { Box, Text, Group, ActionIcon } from '@mantine/core'
import { Icon } from '@iconify/react'

import { formatFileSize } from '@/shared/lib/formatFileSize'
import styles from './FileCard.module.css'

interface FileCardProps {
  fileName: string
  fileSize: number
  fileType: string
  onPreview?: () => void
  onDownload?: () => void
  onDelete?: () => void
}

/**
 * Карточка файла с иконками действий
 *
 * @description
 * Отображает информацию о файле и кнопки действий.
 *
 * @param fileName - Имя файла
 * @param fileSize - Размер файла в байтах
 * @param fileType - Расширение файла
 * @param onPreview - Колбэк для просмотра файла - если передан, показывается соответствующая иконка
 * @param onDownload - Колбэк для скачивания файла - если передан, показывается соответствующая иконка
 * @param onDelete - Колбэк для удаления файла - если передан, показывается соответствующая иконка
 *
 * @example
 * ```tsx
 * // Все действия
 * <FileCard
 *   fileName="Документация.pdf"
 *   fileSize={2048000}
 *   fileType="pdf"
 *   onPreview={() => console.log('Открыть файл')}
 *   onDownload={() => console.log('Скачать файл')}
 *   onDelete={() => console.log('Удалить файл')}
 * />
 *
 * // Только просмотр
 * <FileCard
 *   fileName="Презентация.pptx"
 *   fileSize={5120000}
 *   fileType="pptx"
 *   onPreview={() => console.log('Открыть файл')}
 * />
 *
 * // Без действий — просто карточка
 * <FileCard
 *   fileName="Архив.zip"
 *   fileSize={1024000}
 *   fileType="zip"
 * />
 * ```
 */
export const FileCard = ({
  fileName,
  fileSize,
  fileType,
  onPreview,
  onDownload,
  onDelete,
}: FileCardProps) => {
  return (
    <Box display="flex" px={16} py={12} className={styles.fileCard}>
      <Group gap={12} wrap="nowrap">
        <Icon
          icon="mdi:file-multiple-outline"
          width={24}
          color="var(--mantine-color-primaryBlue-6)"
        />

        <Box>
          <Text size="sm" fw={400} lineClamp={1}>
            {fileName}
          </Text>
          <Text size="xs" c="dimmed">
            {fileType.toUpperCase()} • {formatFileSize(fileSize)}
          </Text>
        </Box>
      </Group>
      <Group gap={4} wrap="nowrap">
        {onPreview && (
          <ActionIcon variant="outline" size="lg" onClick={onPreview}>
            <Icon icon="mdi:eye-outline" width={20} />
          </ActionIcon>
        )}

        {onDownload && (
          <ActionIcon variant="outline" size="lg" onClick={onDownload}>
            <Icon icon="mdi:download-outline" width={20} />
          </ActionIcon>
        )}

        {onDelete && (
          <ActionIcon variant="outline" size="lg" onClick={onDelete}>
            <Icon icon="mdi:delete-outline" width={20} />
          </ActionIcon>
        )}
      </Group>
    </Box>
  )
}
