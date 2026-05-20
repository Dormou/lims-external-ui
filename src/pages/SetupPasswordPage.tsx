import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Title,
  Stack,
  Group,
  Text,
  Box,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../features/auth/authStore";
import { apiClient } from "../api/apiClient";

export const SetupPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = searchParams.get("token");

  const form = useForm({
    initialValues: { password: "", confirmPassword: "" },
    validate: {
      password: (val) => (val.length < 6 ? "Пароль слишком короткий" : null),
      confirmPassword: (val, values) =>
        val !== values.password ? "Пароли не совпадают" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { data } = await apiClient.post("/auth/setup-password", {
        token,
        password: values.password,
      });
      setAuth(data); // Сразу авторизуем пользователя
      navigate("/"); // Редирект на главную
    } catch (e) {
      console.error("Ошибка установки пароля");
    }
  };

  return (
    <Group gap={0} h="100vh" align="stretch">
      <Box style={{ flex: 1, position: "relative", backgroundColor: "#fff" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/login-bg.jpg)",
            backgroundSize: "cover",
            opacity: 0.25,
          }}
        />
        <Stack p={40} h="100%" justify="space-between" pos="relative">
          <Group gap="xl">
            <img src="/logo.png" alt="Россети" style={{ height: 48 }} />
            <Text fw={700} size="28px" c="#005B9C">
              АИС Управление испытаниями
            </Text>
          </Group>
          <Text size="16px" c="#005B9C">
            Разработано Департаментом цифровых технологий АО "Россети НТЦ" ®
          </Text>
        </Stack>
      </Box>

      <Center style={{ flex: 1 }}>
        <Stack w={400} gap={32}>
          <Title
            order={1}
            ta="center"
            c="#005B9C"
            style={{ fontFamily: "DIN Pro", fontSize: 36 }}
          >
            Установка пароля
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={16}>
              <PasswordInput
                placeholder="Введите пароль"
                size="md"
                leftSection={
                  <Icon icon="mdi:lock-outline" width={20} color="#ADB5BD" />
                }
                {...form.getInputProps("password")}
              />
              <PasswordInput
                placeholder="Повторите пароль"
                size="md"
                leftSection={
                  <Icon
                    icon="mdi:lock-check-outline"
                    width={20}
                    color="#ADB5BD"
                  />
                }
                {...form.getInputProps("confirmPassword")}
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
  );
};
