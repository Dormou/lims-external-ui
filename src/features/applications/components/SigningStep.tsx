import { Stack, Text, Button, Group, Box, FileInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useUploadSignedFileMutation } from '../../../api/applications/applicationsApi'
import { useAppDispatch, useAppSelector } from '../../../store'
import { applicationsSlice } from '../applicationStore'

export const SigningStep = () => {
  const dispatch = useAppDispatch()

  const [uploadSignedFile, { isLoading }] = useUploadSignedFileMutation()

  const { applicationId, signedFile, generatedFile } = useAppSelector((state) => state.applicationsSlice)

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
    <Stack gap={24} align='center' w='100%'>
      <Text
        style={{
          fontFamily: 'PF Din Text Cond Pro',
          fontSize: '20px',
          fontWeight: 300,
        }}
        ta='center'
      >
        По вашим данным сформирована заявка.
      </Text>

      <Group
        p='xs'
        style={{
          border: '1px solid #005B9C',
          borderRadius: '8px',
          minWidth: '450px',
        }}
        justify='space-between'
      >
        <Group gap='sm'>
          <Icon
            icon='mdi:file-pdf-box'
            width={32}
            height={32}
            color='#005B9C'
          />
          <Stack gap={0}>
            <Text size='sm' fw={500}>
              {generatedFile?.fileName || 'Заявка на испытания.pdf'}
            </Text>
            <Text size='xs' c='dimmed'>
              {generatedFile?.fileExtension?.toUpperCase() || 'PDF'} •{' '}
              {generatedFile?.fileSize || 'Размер неизвестен'}
            </Text>
          </Stack>
        </Group>
        <Button
          variant='subtle'
          size='xs'
          component='a'
          href={`/api/applications/${applicationId}/raw-file`}
          download
        >
          <Icon icon='mdi:download' width={20} height={20} />
        </Button>
      </Group>

      <Text
        style={{
          fontFamily: 'PF Din Text Cond Pro',
          fontSize: '20px',
          fontWeight: 300,
          maxWidth: '800px',
        }}
        ta='center'
      >
        Пожалуйста, скачайте сформированный файл, распечатайте его на фирменном
        бланке вашей организации, поставьте подпись руководителя организации
        (или иного лица, уполномоченного на подпись документов) и прикрепите
        скан подписанного документа в форму ниже.
      </Text>

      <Box w='100%' style={{ maxWidth: '600px' }}>
        <FileInput
          label='Подписанная заявка'
          required
          placeholder='Нажмите, чтобы выбрать файл'
          leftSection={<Icon icon='mdi:file-upload-outline' width={20} />}
          value={signedFile}
          onChange={(payload) => dispatch(applicationsSlice.actions.setSignedFile(payload))}
          clearable
        />
      </Box>

      <Group gap='md' mt='xl'>
        <Button variant='outline' size='lg' onClick={() => dispatch(applicationsSlice.actions.setStep(1))}>
          Редактировать заявку
        </Button>
        <Button
          variant='filled'
          size='lg'
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
