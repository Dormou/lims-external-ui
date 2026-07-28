import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PasswordInput, Button, Title, Stack, Center } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Icon } from '@iconify/react'
import { login, useSetupPasswordMutation } from '@/entities/auth'
import { RoutesPath } from '@/shared/config'

export const SetupPasswordForm = () => {
  const dispatch = useDispatch()
  const [setupPassword] = useSetupPasswordMutation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const form = useForm({
    initialValues: { password: '', confirmPassword: '' },
    validate: {
      password: (val) => (val.length < 6 ? 'Пароль слишком короткий' : null),
      confirmPassword: (val, values) =>
        val !== values.password ? 'Пароли не совпадают' : null,
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    if (!token) return

    try {
      const data = await setupPassword({
        token,
        password: values.password,
      }).unwrap()

      dispatch(login(data))

      navigate(RoutesPath.Home)
    } catch (e) {
      console.error('Ошибка установки пароля')
    }
  }

  return (
    <Center flex={1} bg="white">
      <Stack w={400} gap={32}>
        <Title order={1} ta="center" c="primaryBlue">
          Установка пароля
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap={16}>
            <PasswordInput
              placeholder="Введите пароль"
              size="md"
              leftSection={
                <Icon icon="mdi:lock-outline" width={20} color="dimmed" />
              }
              {...form.getInputProps('password')}
            />
            <PasswordInput
              placeholder="Повторите пароль"
              size="md"
              leftSection={
                <Icon icon="mdi:lock-check-outline" width={20} color="dimmed" />
              }
              {...form.getInputProps('confirmPassword')}
            />
            <Button
              type="submit"
              variant="filled"
              size="lg"
              mt={16}
              disabled={!token}
            >
              Сохранить
            </Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  )
}
