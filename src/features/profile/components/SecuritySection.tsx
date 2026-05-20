/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  PasswordInput,
  Button,
  Group,
  Stack,
  Title,
  Text,
  Divider,
  Box,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuthStore } from "../../auth/authStore";
import { profileApi } from "../profileApi";
import { formatDate, getMonthNoun } from "../../../utils";
import dayjs from "dayjs";

export const SecuritySection = ({ lastUpdate }: { lastUpdate: string }) => {
  const monthsAgo = lastUpdate
    ? dayjs().diff(lastUpdate, "month")
    : 0;
  const timeAgoText =
    monthsAgo < 1
      ? "меньше месяца назад"
      : `${monthsAgo} ${getMonthNoun(monthsAgo)} назад`;
  const isExpired = monthsAgo >= 3;

  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);

  const passwordForm = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      newPassword: (val) => (val.length < 6 ? "Пароль слишком короткий" : null),
      confirmPassword: (val, values) =>
        val !== values.newPassword ? "Пароли не совпадают" : null,
    },
  });

  const handleSavePassword = async (values: typeof passwordForm.values) => {
    try {
      const { data } = await profileApi.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      setAuth(data);
      setIsPasswordEditing(false);
      passwordForm.reset();
      // Можно добавить уведомление об успехе
    } catch (e) {
      console.error("Ошибка смены пароля");
    }
  };

  return (
    <Box pt={20}>
      <Title order={3} c="#005B9C" mb={16}>
        Безопасность
      </Title>
      <Divider mb={24} />

      {!isPasswordEditing ? (
        <Group justify="space-between" align="flex-end">
          <Stack gap={4}>
            <Text size="sm">
              Последнее изменение пароля:{" "}
              {lastUpdate ? formatDate(lastUpdate) : ""}
              {lastUpdate && (
                <Text span c={isExpired ? "red" : "dimmed"} inherit ml={4}>
                  ({timeAgoText})
                </Text>
              )}
            </Text>

            {isExpired && (
              <Text size="xs" c="red">
                Рекомендуется менять пароль каждые 3 месяца
              </Text>
            )}
          </Stack>
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsPasswordEditing(true)}
          >
            Изменить пароль
          </Button>
        </Group>
      ) : (
        <form onSubmit={passwordForm.onSubmit(handleSavePassword)}>
          <Grid gap="xl" align="flex-start">
            <Grid.Col span={4}>
              <PasswordInput
                label="Текущий пароль"
                placeholder="Введите текущий пароль"
                {...passwordForm.getInputProps("oldPassword")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <PasswordInput
                label="Новый пароль"
                placeholder="Введите новый пароль"
                {...passwordForm.getInputProps("newPassword")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <PasswordInput
                label="Подтверждение пароля"
                placeholder="Повторите новый пароль"
                {...passwordForm.getInputProps("confirmPassword")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="xl">
            <Button
              variant="outline"
              onClick={() => {
                setIsPasswordEditing(false);
                passwordForm.reset();
              }}
            >
              Отмена
            </Button>
            <Button type="submit" variant="filled">
              Сохранить пароль
            </Button>
          </Group>
        </form>
      )}
    </Box>
  );
};
