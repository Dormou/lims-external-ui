import { useRef } from 'react'
import { Box, Group, Stack, Text } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { Icon } from '@iconify/react'
import { formatFileSize } from '@/shared/lib/formatFileSize'
import styles from './FileUploader.module.css'

export const EXTENSIONS = {
  pdf: MIME_TYPES.pdf,
  doc: MIME_TYPES.doc,
  docx: MIME_TYPES.docx,
  xls: MIME_TYPES.xls,
  xlsx: MIME_TYPES.xlsx,
  csv: MIME_TYPES.csv,
  zip: MIME_TYPES.zip,
} as const

type Extension = (typeof EXTENSIONS)[keyof typeof EXTENSIONS]

interface FileUploaderProps {
  filesLimit?: number
  maxFileSize?: number
  allowedFileTypes?: Extension[]
  orientation?: 'horizontal' | 'vertical'
  currentFilesCount?: number
  isLoading?: boolean
  children?: React.ReactNode
  onFilesSelected: (files: File[]) => void
}

/**
 * Компонент загрузки файлов
 *
 * @description
 * Отображает зону для выбора файлов (drag & drop или клик) и слот
 * для отображения уже выбранных файлов. Не хранит файлы — пробрасывает
 * их в родителя через onFilesSelected.
 *
 * @param filesCountLimit - максимальное количество файлов (по умолчанию 10)
 * @param maxFileSize - максимальный размер одного файла в байтах (по умолчанию 10 МБ)
 * @param allowedFileTypes - список допустимых форматов (по умолчанию ['.pdf', '.doc', '.docx', '.xls', '.xlsx'])
 * @param orientation - horizontal - зона и файлы в строку, vertical — в столбик (по умолчанию vertical)
 * @param currentFilesCount - текущее количество файлов (по умолчанию 0)
 * @param isLoading - состояние загрузки (по умолчанию false)
 * @param children - слот для списка загруженных файлов (например, FileCard)
 * @param onFilesSelected - колбэк при выборе файлов пользователем
 *
 * @example
 * ```tsx
 * const [files, setFiles] = useState<File[]>([]);
 *
 * <FileUploader
 *   filesCountLimit={5}
 *   maxFileSize={10 * 1024 * 1024}
 *   allowedFileTypes={[EXTENSIONS.pdf, EXTENSIONS.doc]}
 *   orientation="vertical"
 *   onFilesSelected={setFiles}
 * >
 *   {files.map(file => (
 *     <FileCard
 *       key={file.name}
 *       fileName={file.name}
 *       fileSize={file.size}
 *       fileType={file.name.split('.').pop() || ''}
 *     />
 *   ))}
 * </FileUploader>
 * ```
 */
export const FileUploader = ({
  filesLimit: filesCountLimit = 10,
  maxFileSize = 10485760,
  allowedFileTypes = [
    EXTENSIONS.pdf,
    EXTENSIONS.doc,
    EXTENSIONS.docx,
    EXTENSIONS.xls,
    EXTENSIONS.xlsx,
  ],
  orientation = 'vertical',
  currentFilesCount = 0,
  isLoading = false,
  children,
  onFilesSelected,
}: FileUploaderProps) => {
  const openRef = useRef<() => void>(null)

  const isLimitReached = currentFilesCount >= filesCountLimit
  const isMultiple = filesCountLimit > 1

  const renderDropZone = () => (
    <Dropzone
      openRef={openRef}
      onDrop={onFilesSelected}
      maxSize={maxFileSize}
      accept={allowedFileTypes}
      disabled={isLimitReached}
      multiple={isMultiple}
      loading={isLoading}
      p={24}
      ta="center"
      flex={orientation === 'horizontal' ? 1 : undefined}
      className={styles.dropzone}
    >
      <Icon
        icon="mdi:paperclip-plus"
        width={32}
        color="var(--mantine-color-primaryBlue-6)"
        rotate={3}
        hFlip={true}
      />
      <Text size="sm" fw={400}>
        Перетащите {isMultiple ? 'файлы' : 'файл'} сюда или нажмите для выбора
      </Text>
      <Text c="dimmed" size="xs" mt={4}>
        {isMultiple &&
          `${allowedFileTypes.join(', ')} • до ${formatFileSize(maxFileSize)} • макс. ${filesCountLimit} шт.`}
        {!isMultiple &&
          `${allowedFileTypes.join(', ')} • до ${formatFileSize(maxFileSize)}`}
      </Text>
    </Dropzone>
  )

  return (
    <Box>
      {orientation === 'horizontal' ? (
        <Group align="flex-start" wrap="nowrap">
          {renderDropZone()}
          <Stack gap={8} flex={1}>
            {children}
          </Stack>
        </Group>
      ) : (
        <Stack>
          {renderDropZone()}
          <Stack gap={8}>{children}</Stack>
        </Stack>
      )}
    </Box>
  )
}
