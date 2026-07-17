import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
  Group,
  Text,
  Anchor,
  Box,
  Center,
  Image,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Icon } from '@iconify/react'
import { useDisclosure } from '@mantine/hooks'
import { RegistrationModal } from '../../features/auth/components/RegistrationModal'
import { PasswordRecoveryModal } from '../../features/auth/components/PasswordRecoveryModal'
import { useAppDispatch } from '../../store'
import { authSlice } from '../../features/auth/authStore'
import { useLoginMutation } from '../../api/auth/authApi'
import styles from './LoginPage.module.css'

export const LoginPage = () => {
  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

  const form = useForm({
    initialValues: { email: '', password: '', userType: 'Client' },
  })

  const [registrationOpened, registrationHandlers] = useDisclosure(false)
  const [recoverOpened, recoverHandlers] = useDisclosure(false)

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = await login({ ...values }).unwrap()
      dispatch(authSlice.actions.setAuth(data))
    } catch (e) {
      console.error('Ошибка входа')
    }
  }

  return (
    <>
      <Group gap={0} h="100vh" align="stretch">
        <Box flex={1} pos="relative" bg="white" className={styles.contentBox}>
          <Box className={styles.loginBackground} />

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
              Вход в систему
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap={16}>
                <TextInput
                  placeholder="Логин"
                  size="md"
                  leftSection={
                    <Icon
                      icon="mdi:account-outline"
                      width={20}
                      color="dimmed"
                    />
                  }
                  {...form.getInputProps('email')}
                />
                <Stack gap={4}>
                  <PasswordInput
                    placeholder="Пароль"
                    size="md"
                    leftSection={
                      <Icon
                        icon="mdi:lock-outline"
                        width={20}
                        color="dimmed"
                      />
                    }
                    {...form.getInputProps('password')}
                  />
                  <Anchor
                    size="sm"
                    c="dimmed"
                    onClick={recoverHandlers.open}
                  >
                    Восстановить пароль
                  </Anchor>
                </Stack>

                <Button variant="filled" type="submit" size="lg" mt={16}>
                  Войти
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={registrationHandlers.open}
                >
                  Зарегистрироваться
                </Button>
              </Stack>
            </form>
          </Stack>
        </Center>
      </Group>
      <RegistrationModal
        opened={registrationOpened}
        onClose={registrationHandlers.close}
      />
      <PasswordRecoveryModal
        opened={recoverOpened}
        onClose={recoverHandlers.close}
      />
    </>
  )
}
