import { Icon } from '@iconify/react'
import { Stack, PasswordInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useDownloadDocumentsArchiveMutation } from '../api/downloadDocumentsAPI'

interface DownloadDocumentsFormProps {
  applicationId: string
}

export const DownloadDocumentsForm = ({ applicationId }: DownloadDocumentsFormProps) => {

  const [downloadArchive, { isLoading }] = useDownloadDocumentsArchiveMutation()

  const form = useForm({ initialValues: { password: '' } })

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const blob = await downloadArchive({ applicationId, password: values.password }).unwrap()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `archive-${applicationId}.zip`
      link.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Ошибка скачивания:', e)
    }
  }

  // Простая проверка на пустой пароль
  const isDisabled = !form.values.password

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <PasswordInput
          placeholder="Введите пароль из письма"
          size="md"
          leftSection={
            <Icon icon="mdi:lock-outline" width={20} color="dimmed" />
          }
          {...form.getInputProps('password')}
        />

        <Button
          variant="filled"
          type="submit"
          size="lg"
          mt={16}
          disabled={isDisabled}
          loading={isLoading}
        >
          Скачать архив
        </Button>
      </Stack>
    </form>
  )
}