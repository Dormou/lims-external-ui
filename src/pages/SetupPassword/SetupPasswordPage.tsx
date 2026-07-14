import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  PasswordInput,
  Button,
  Title,
  Stack,
  Group,
  Text,
  Box,
  Center,
  Image,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Icon } from '@iconify/react'
import { useAppDispatch } from '../../store'
import { useSetupPasswordMutation } from '../../api/auth/authApi'
import { authSlice } from '../../features/auth/authStore'
import styles from './SetupPasswordPage.module.css'

export const SetupPasswordPage = () => {
  const dispatch = useAppDispatch()

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

      dispatch(authSlice.actions.setAuth(data))
      navigate('/')
    } catch (e) {
      console.error('Ошибка установки пароля')
    }
  }

  return (
      <Group gap={0} h="100vh" align="stretch">
        <Box flex={1} pos="relative" bg="white" className={styles.contentBox}>
          <Box className={styles.passwordChangeBackground} />

          <Stack
            p={40}
            h="100%"
            justify="space-between"
            pos="relative"
            className={styles.backGroundStack}
          >
            <Group gap="xl">
              <Image src="/logo.png" alt="Россети" h={48} w="auto" />
              <Text fw={700} size="xxl" c="primaryBlue">
                АИС Управление испытаниями
              </Text>
            </Group>

            <Text
              size="md"
              c="primaryBlue"
            >
              Разработано Департаментом цифровых технологий АО 'Россети
              Научно-технический центр' ®
            </Text>
          </Stack>
        </Box>

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
                  <Icon
                    icon="mdi:lock-check-outline"
                    width={20}
                    color="dimmed"
                  />
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
    </Group>
  )
}
