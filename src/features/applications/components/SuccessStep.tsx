import { Stack, Text, Group, Button } from '@mantine/core'
import { Icon } from '@iconify/react'
import { formatDate } from '../../../utils'
import { useAppSelector } from '../../../store'
import styles from './SuccessStep.module.css'

export const SuccessStep = () => {
  const { applicationId, signedFileMeta } = useAppSelector(
    (state) => state.applicationsSlice
  )

  const fileCreatedDate = signedFileMeta?.createdAt
    ? formatDate(signedFileMeta.createdAt)
    : ''

  const downloadSignedUrl = `/api/applications/${applicationId}/signed-file`

  return (
    <Stack gap={24} align="center" w="100%">
      <Text
        fw={300}
        size="xl"
        ta="center"
      >
        Вы направили заявку {fileCreatedDate}. Пожалуйста, ожидайте ответ на
        указанный Вами email.
      </Text>

      <Group
        p="xs"
        bg='white'
        bd="1px solid primaryBlue"
        miw={450}
        className={styles.groupInfo}
        justify="space-between"
      >
        <Group gap="sm">
          <Icon icon="mdi:file-check" width={32} height={32} color="primaryBlue" />
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              {signedFileMeta?.fileName || 'Подписанная_заявка.pdf'}
            </Text>
            <Text size="xs" c="dimmed">
              {signedFileMeta?.fileExtension?.toUpperCase() || 'PDF'} •{' '}
              {signedFileMeta?.fileSize || 'Размер неизвестен'}
            </Text>
          </Stack>
        </Group>
        <Button
          variant="subtle"
          size="xs"
          component="a"
          href={downloadSignedUrl}
          download
        >
          <Icon icon="mdi:download" width={20} height={20} />
        </Button>
      </Group>
    </Stack>
  )
}
