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
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { Icon } from "@iconify/react"

import { useDisclosure } from "@mantine/hooks"
import { RegistrationModal } from "../features/auth/components/RegistrationModal"
import { PasswordRecoveryModal } from "../features/auth/components/PasswordRecoveryModal"
import { useAppDispatch } from '../store'
import { authSlice } from '../features/auth/authStore'
import { useLoginMutation } from '../api/auth/authApi'

export const LoginPage = () => {
  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

  const form = useForm({
    initialValues: { email: "", password: "", userType: "Client" },
  })

  const [registrationOpened, registrationHandlers] = useDisclosure(false)
  const [recoverOpened, recoverHandlers] = useDisclosure(false)

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = await login({...values}).unwrap()
      dispatch(authSlice.actions.setAuth(data))
    } catch (e) {
      console.error("Ошибка входа")
    }
  }

  return (
    <>
      <Group gap={0} h="100vh" align="stretch">
        <Box
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(/login-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.25,
              zIndex: 1,
            }}
          />

          <Stack
            p={40}
            h="100%"
            justify="space-between"
            style={{ position: "relative", zIndex: 2 }}
          >
            <Group gap="xl">
              <img src="/logo.png" alt="Россети" style={{ height: 48 }} />
              <Text
                fw={700}
                size="28px"
                c="#005B9C"
                style={{ fontFamily: "DIN Pro" }}
              >
                АИС Управление испытаниями
              </Text>
            </Group>

            <Text
              size="16px"
              c="#005B9C"
              style={{ fontFamily: "PF Din Text Cond Pro" }}
            >
              Разработано Департаментом цифровых технологий АО "Россети
              Научно-технический центр" ®
            </Text>
          </Stack>
        </Box>

        <Center style={{ flex: 1, backgroundColor: "#fff" }}>
          <Stack w={400} gap={32}>
            <Title
              order={1}
              ta="center"
              c="#005B9C"
              style={{ fontFamily: "DIN Pro", fontSize: 36 }}
            >
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
                      color="#ADB5BD"
                    />
                  }
                  {...form.getInputProps("email")}
                />
                <Stack gap={4}>
                  <PasswordInput
                    placeholder="Пароль"
                    size="md"
                    leftSection={
                      <Icon
                        icon="mdi:lock-outline"
                        width={20}
                        color="#ADB5BD"
                      />
                    }
                    {...form.getInputProps("password")}
                  />
                  <Anchor
                    size="sm"
                    c="#ADB5BD"
                    onClick={recoverHandlers.open}
                    style={{ alignSelf: "flex-start" }}
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
  );
};
