import { useDispatch } from 'react-redux'
import {
  PasswordInput,
  Button,
  Group,
  Stack,
  Title,
  Text,
  Divider,
  Box,
  Modal,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { setAuth, useChangePasswordMutation } from '@/entities/auth'
import { useGetProfileQuery } from '@/entities/user'
import { formatDate, getMonthNoun } from '@/shared/lib'
import dayjs from 'dayjs'

export const SecurityForm = () => {
  const dispatch = useDispatch()

  const { data } = useGetProfileQuery()

  const [changePassword] = useChangePasswordMutation()

  // Управление видимостью модального окна
  const [opened, { open, close }] = useDisclosure(false)

  const lastUpdate = data?.passwordChangeDate
  const monthsAgo = lastUpdate ? dayjs().diff(lastUpdate, 'month') : 0
  const timeAgoText =
    monthsAgo < 1
      ? 'меньше месяца назад'
      : `${monthsAgo} ${getMonthNoun(monthsAgo)} назад`
  const isExpired = monthsAgo >= 3

  const passwordForm = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: (val) => (val.length < 6 ? 'Пароль слишком короткий' : null),
      confirmPassword: (val, values) =>
        val !== values.newPassword ? 'Пароли не совпадают' : null,
    },
  })

  // Очистка и закрытие модального окна
  const handleCancel = () => {
    passwordForm.reset()
    close()
  }

  const handleSavePassword = async (values: typeof passwordForm.values) => {
    try {
      const saveResponse = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap()

      // Обновление данных авторизации
      dispatch(setAuth(saveResponse))

      // Очистка формы
      passwordForm.reset()
      close()

      // Можно добавить уведомление об успехе
    } catch (e) {
      console.error('Ошибка смены пароля')
    }
  }

  return (
    <Box pt={20}>
      <Title order={3} c="primaryBlue" mb={16}>
        Безопасность
      </Title>
      <Divider mb={24} />

      <Group justify="space-between" align="flex-end">
        <Stack gap={4}>
          <Text size="sm">
            Последнее изменение пароля:{' '}
            {lastUpdate ? formatDate(lastUpdate) : ''}
            {lastUpdate && (
              <Text span c={isExpired ? 'errorRed' : 'dimmed'} inherit ml={4}>
                ({timeAgoText})
              </Text>
            )}
          </Text>

          {isExpired && (
            <Text size="xs" c="errorRed">
              Рекомендуется менять пароль каждые 3 месяца
            </Text>
          )}
        </Stack>
        <Button
          variant="outline"
          size="md"
          onClick={open}
        >
          Изменить пароль
        </Button>
      </Group>

      <Modal
        opened={opened}
        onClose={handleCancel}
        size={500}
        padding={40}
        radius="md"
        withCloseButton={false}
      >
        <form onSubmit={passwordForm.onSubmit(handleSavePassword)}>
          <Stack gap="lg">
            <Title size="xl" fw={500} ta='center'>
              Изменение пароля
            </Title>

            <PasswordInput
              label='Текущий пароль'
              placeholder="Введите текущий пароль"
              {...passwordForm.getInputProps('oldPassword')}
            />


            <PasswordInput
              label='Новый пароль'
              placeholder="Введите новый пароль"
              {...passwordForm.getInputProps('newPassword')}
            />

            <PasswordInput
              label='Подтверждение пароля'
              placeholder="Повторите новый пароль"
              {...passwordForm.getInputProps('confirmPassword')}
            />

            <Group justify="flex-end" mt="xl">
              <Button variant="outline" onClick={handleCancel}>
                Отмена
              </Button>
              <Button type="submit" variant="filled">
                Сохранить пароль
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  )
}
