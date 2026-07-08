import { useState } from 'react'
import {
  Modal,
  TextInput,
  Grid,
  Title,
  Text,
  Stack,
  Button,
  Group,
  ActionIcon,
  Anchor,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconX } from '@tabler/icons-react'

import { useRegisterClientMutation } from '../../../entities/clients/index'

export const RegistrationModal = ({
  opened,
  onClose,
}: {
  opened: boolean
  onClose: () => void
}) => {
  const [registerClient, { isLoading }] = useRegisterClientMutation()

  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      email: '',
      organizationFullName: '',
      organizationShortName: '',
      innKpp: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      innKpp: (value) =>
        /^\d{10}\/\d{9}$/.test(value) ? null : 'Формат: 10 цифр / 9 цифр',
      firstName: (value) => (value.length < 1 ? 'Обязательное поле' : null),
      lastName: (value) => (value.length < 1 ? 'Обязательное поле' : null),
      organizationFullName: (value) =>
        value.length < 1 ? 'Обязательное поле' : null,
    },
  })

  const handleRegister = async (values: typeof form.values) => {
    try {
      await registerClient({
        ...values,
        patronymic: values.patronymic || null,
        organizationShortName: values.organizationShortName || null,
      })
      setIsSuccess(true)
    } catch (error: any) {
      if (error.response?.status === 409) {
        form.setFieldError(
          'email',
          'Пользователь с таким email уже зарегистрирован'
        )
      }
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    form.reset()
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      size="xl"
      padding={40}
      radius="md"
      withCloseButton={false}
    >
      <Group justify="flex-end" mb={isSuccess ? 0 : 32}>
        <ActionIcon variant="subtle" color="gray" onClick={handleClose}>
          <IconX size={24} />
        </ActionIcon>
      </Group>

      {!isSuccess ? (
        <form onSubmit={form.onSubmit(handleRegister)}>
          <Title
            order={2}
            ta="center"
            mb={32}
            style={{ fontFamily: 'DIN Pro', fontSize: 24 }}
          >
            Регистрация в АИС Управление испытаниями
          </Title>

          <Grid gap={40}>
            <Grid.Col span={6}>
              <Stack gap={16}>
                <Title
                  order={4}
                  c="#005B9C"
                  style={{
                    borderBottom: '2px solid #005B9C',
                    paddingBottom: 8,
                  }}
                >
                  Информация о пользователе
                </Title>
                <TextInput
                  label="Фамилия"
                  placeholder="Введите фамилию"
                  required
                  {...form.getInputProps('lastName')}
                />
                <TextInput
                  label="Имя"
                  placeholder="Введите имя"
                  required
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  label="Отчество (при наличии)"
                  placeholder="Введите отчество"
                  {...form.getInputProps('patronymic')}
                />
                <TextInput
                  label="Email"
                  placeholder="Введите email"
                  required
                  {...form.getInputProps('email')}
                />
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack gap={16}>
                <Title
                  order={4}
                  c="#005B9C"
                  style={{
                    borderBottom: '2px solid #005B9C',
                    paddingBottom: 8,
                  }}
                >
                  Информация об организации
                </Title>
                <TextInput
                  label="Полное наименование"
                  placeholder="Введите полное наименование"
                  required
                  {...form.getInputProps('organizationFullName')}
                />
                <TextInput
                  label="Сокращённое наименование"
                  placeholder="Введите сокращённое наименование"
                  {...form.getInputProps('organizationShortName')}
                />
                <TextInput
                  label="ИНН/КПП"
                  placeholder="Введите ИНН/КПП"
                  required
                  {...form.getInputProps('innKpp')}
                />
              </Stack>
            </Grid.Col>
          </Grid>

          <Stack align="center" mt={40} gap="xl">
            <Text size="xs" ta="center" c="dimmed">
              Нажимая 'Зарегистрироваться', я подтверждаю согласие на обработку
              персональных данных
            </Text>
            <Button
              type="submit"
              variant="filled"
              size="lg"
              px={60}
              loading={isLoading}
            >
              Зарегистрироваться
            </Button>
          </Stack>
        </form>
      ) : (
        <Stack align="center" gap={24} py={20}>
          <Title
            order={2}
            ta="center"
            style={{ fontFamily: 'DIN Pro', fontSize: 24 }}
          >
            Регистрация в АИС Управление испытаниями
          </Title>
          <Text
            ta="center"
            size="lg"
            style={{ fontFamily: 'PF Din Text Cond Pro' }}
          >
            На адрес{' '}
            <Text span fw={700}>
              {form.values.email}
            </Text>{' '}
            отправлено письмо с инструкцией по установке пароля. Пожалуйста,
            выполните инструкции в письме для завершения регистрации.
          </Text>
          <Text
            ta="center"
            c="dimmed"
            size="md"
            style={{ fontFamily: 'PF Din Text Cond Pro' }}
          >
            Если письмо не пришло, проверьте папку 'Спам' или обратитесь в
            службу технической поддержки{' '}
            <Anchor href="mailto:lims-service@yandex.ru">
              lims-service@yandex.ru
            </Anchor>
          </Text>
          <Button
            size="lg"
            variant="filled"
            px={60}
            onClick={handleClose}
            mt={20}
          >
            OK
          </Button>
        </Stack>
      )}
    </Modal>
  )
}
