import { Icon } from '@iconify/react'
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useLoginMutation } from '@/entities/auth'

interface LoginFormProps {
  recoverPasswordButton: React.ReactNode | null
  registerButton: React.ReactNode | null
}

export const LoginForm = ({
  recoverPasswordButton,
  registerButton,
}: LoginFormProps) => {
  const [login] = useLoginMutation()

  const form = useForm({
    initialValues: { email: '', password: '', userType: 'Client' },
  })

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = await login({ ...values }).unwrap()
    } catch (e) {
      console.error('Ошибка входа')
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <TextInput
          placeholder="Логин"
          size="md"
          leftSection={
            <Icon icon="mdi:account-outline" width={20} color="dimmed" />
          }
          {...form.getInputProps('email')}
        />
        <Stack gap={4}>
          <PasswordInput
            placeholder="Пароль"
            size="md"
            leftSection={
              <Icon icon="mdi:lock-outline" width={20} color="dimmed" />
            }
            {...form.getInputProps('password')}
          />
          {recoverPasswordButton}
        </Stack>

        <Button variant="filled" type="submit" size="lg" mt={16}>
          Войти
        </Button>

        {registerButton}
      </Stack>
    </form>
  )
}
