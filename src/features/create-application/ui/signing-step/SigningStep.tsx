import { useState } from 'react'
import { Stack, Text, Button, Group, Box, FileInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useUploadSignedFileMutation } from '../../api/createApplicationApi'
import type { Step } from '../CreateApplicationForm'
import { useGetApplication } from '../../lib/useGetApplication'
import styles from './SigningStep.module.css'

export const SigningStep = ({
  setCurrentStep,
}: {
  setCurrentStep: (value: Step) => void
}) => {
  const { applicationData } = useGetApplication()
  const [uploadSignedFile, { isLoading }] = useUploadSignedFileMutation()

  const [signedFile, setSignedFile] = useState<File | null>(null)

  const handleSend = async () => {
    if (!applicationData || !signedFile) return
    try {
      await uploadSignedFile({
        applicationId: applicationData?.id ?? '',
        signedFile,
      }).unwrap()
    } catch (e) {
      console.error('Ошибка отправки файла:', e)
    }
  }

  return (
    <Stack gap={24} align="center" w="100%">
      <Text fw={300} size="xl" ta="center">
        По вашим данным сформирована заявка.
      </Text>

      <Group
        p="xs"
        bd="1px solid primaryBlue"
        miw={450}
        className={styles.groupInfo}
        justify="space-between"
      >
        <Group gap="sm">
          <Icon
            icon="mdi:file-pdf-box"
            width={32}
            height={32}
            color="primaryBlue"
          />
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              {applicationData?.rawFile?.fileName ?? 'Заявка на испытания.pdf'}
            </Text>
            <Text size="xs" c="dimmed">
              {applicationData?.rawFile?.fileExtension?.toUpperCase() ?? 'PDF'}{' '}
              • {applicationData?.rawFile?.fileSize ?? 'Размер неизвестен'}
            </Text>
          </Stack>
        </Group>
        <Button
          variant="subtle"
          size="xs"
          component="a"
          href={`/api/applications/${applicationData?.id}/raw-file`}
          download
        >
          <Icon icon="mdi:download" width={20} height={20} />
        </Button>
      </Group>

      <Text fw={300} size="xl" maw={800} ta="center">
        Пожалуйста, скачайте сформированный файл, распечатайте его на фирменном
        бланке вашей организации, поставьте подпись руководителя организации
        (или иного лица, уполномоченного на подпись документов) и прикрепите
        скан подписанного документа в форму ниже.
      </Text>

      <Box w="100%" maw={600}>
        <FileInput
          label="Подписанная заявка"
          required
          placeholder="Нажмите, чтобы выбрать файл"
          leftSection={<Icon icon="mdi:file-upload-outline" width={20} />}
          value={signedFile}
          onChange={(payload) => setSignedFile(payload)}
          clearable
        />
      </Box>

      <Group gap="md" mt="xl">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setCurrentStep('draft')}
        >
          Редактировать заявку
        </Button>
        <Button
          variant="filled"
          size="lg"
          disabled={!signedFile}
          loading={isLoading}
          onClick={handleSend}
        >
          Отправить заявку
        </Button>
      </Group>
    </Stack>
  )
}
