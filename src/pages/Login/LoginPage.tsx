import { Center, Stack, Title, Anchor, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PasswordRecoveryModal } from '@/features/recover-password'
import { RegisterUserModal } from '@/features/register-user'
import { LoginForm } from '@/features/login'

export const LoginPage = () => {
  const [registrationOpened, registrationHandlers] = useDisclosure(false)
  const [recoverOpened, recoverHandlers] = useDisclosure(false)

  return (
    <>
      <Center flex={1} bg="white">
        <Stack w={400} gap={32}>
          <Title order={1} ta="center" c="primaryBlue">
            Вход в систему
          </Title>

          <LoginForm
            recoverPasswordButton={
              <Anchor size="sm" c="dimmed" onClick={recoverHandlers.open}>
                Восстановить пароль
              </Anchor>
            }
            registerButton={
              <Button
                variant="outline"
                size="lg"
                onClick={registrationHandlers.open}
              >
                Зарегистрироваться
              </Button>
            }
          />
        </Stack>
      </Center>
      <RegisterUserModal
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
