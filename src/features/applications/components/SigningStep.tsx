import { Stack, Text, Button, Group, Box, FileInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useUploadSignedFileMutation } from '../../../api/applications/applicationsApi'
import { useAppDispatch, useAppSelector } from '../../../store'
import { applicationsSlice } from '../applicationStore'
import styles from './SigningStep.module.css'

export const SigningStep = () => {
  const dispatch = useAppDispatch()

  const [uploadSignedFile, { isLoading }] = useUploadSignedFileMutation()

  const { applicationId, signedFile, generatedFile } = useAppSelector(
    (state) => state.applicationsSlice
  )

  const handleSend = async () => {
    if (!applicationId || !signedFile) return
    try {
      const responseData = await uploadSignedFile({
        applicationId,
        signedFile,
      }).unwrap()
      dispatch(applicationsSlice.actions.setSignedFileMeta(responseData))
      dispatch(applicationsSlice.actions.setStep(3))
    } catch (e) {
      console.error('Ошибка отправки файла:', e)
    }
  }

  return (
    <Stack gap={24} align="center" w="100%">
      <Text
        fw={300}
        size="xl"
        ta="center"
      >
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
              {generatedFile?.fileName || 'Заявка на испытания.pdf'}
            </Text>
            <Text size="xs" c="dimmed">
              {generatedFile?.fileExtension?.toUpperCase() || 'PDF'} •{' '}
              {generatedFile?.fileSize || 'Размер неизвестен'}
            </Text>
          </Stack>
        </Group>
        <Button
          variant="subtle"
          size="xs"
          component="a"
          href={`/api/applications/${applicationId}/raw-file`}
          download
        >
          <Icon icon="mdi:download" width={20} height={20} />
        </Button>
      </Group>

      <Text
        fw={300}
        size="xl"
        maw={800}
        ta="center"
      >
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
          onChange={(payload) =>
            dispatch(applicationsSlice.actions.setSignedFile(payload))
          }
          clearable
        />
      </Box>

      <Group gap="md" mt="xl">
        <Button
          variant="outline"
          size="lg"
          onClick={() => dispatch(applicationsSlice.actions.setStep(1))}
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
