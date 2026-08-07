import { Stack, Text, Group, Button } from '@mantine/core'
import { Icon } from '@iconify/react'
import { formatDate } from '@/shared/lib'
import { useGetApplication } from '../../lib/useGetApplication'
import styles from './SuccessStep.module.css'

export const SuccessStep = () => {
  const { applicationData } = useGetApplication()

  const fileCreatedDate = applicationData?.signedFile?.createdAt
    ? formatDate(applicationData.signedFile.createdAt)
    : ''

  const downloadSignedUrl = `/api/applications/${applicationData?.id}/signed-file`

  return (
    <Stack gap={24} align="center" w="100%">
      <Text fw={300} size="xl" ta="center">
        Вы направили заявку {fileCreatedDate}. Пожалуйста, ожидайте ответ на
        указанный Вами email.
      </Text>

      <Group
        p="xs"
        bg="white"
        bd="1px solid primaryBlue"
        miw={450}
        className={styles.groupInfo}
        justify="space-between"
      >
        <Group gap="sm">
          <Icon
            icon="mdi:file-check"
            width={32}
            height={32}
            color="primaryBlue"
          />
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              {applicationData?.signedFile?.fileName ??
                'Подписанная_заявка.pdf'}
            </Text>
            <Text size="xs" c="dimmed">
              {applicationData?.signedFile?.fileExtension?.toUpperCase() ??
                'PDF'}{' '}
              • {applicationData?.signedFile?.fileSize ?? 'Размер неизвестен'}
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
