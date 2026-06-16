import { Stack, Text, Group, Button } from '@mantine/core'
import { Icon } from '@iconify/react'
import { formatDate } from '../../../utils'
import { useAppSelector } from '../../../store'

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
        style={{
          fontFamily: 'PF Din Text Cond Pro',
          fontSize: '20px',
          fontWeight: 300,
        }}
        ta="center"
      >
        Вы направили заявку {fileCreatedDate}. Пожалуйста, ожидайте ответ на
        указанный Вами email.
      </Text>

      <Group
        p="xs"
        style={{
          border: '1px solid #005B9C',
          borderRadius: '8px',
          minWidth: '450px',
          backgroundColor: '#F8F9FA',
        }}
        justify="space-between"
      >
        <Group gap="sm">
          <Icon icon="mdi:file-check" width={32} height={32} color="#005B9C" />
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
