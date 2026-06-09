import { useState } from "react"
import {
  Modal,
  TextInput,
  Title,
  Text,
  Stack,
  Button,
  Group,
  ActionIcon,
  Anchor,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconX } from "@tabler/icons-react"
import { useRecoverPasswordMutation } from '../../../api/auth/authApi'

interface Props {
  opened: boolean
  onClose: () => void
}

export const PasswordRecoveryModal = ({ opened, onClose }: Props) => {
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()

  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Некорректный email"),
    },
  })

  const handleRecover = async (values: typeof form.values) => {
    try {
      await recoverPassword({email: values.email}).unwrap()  
    } catch (error: any) {
      if (error.response?.status === 404) {
        form.setFieldError("email", "Пользователя с таким email не существует")
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
      size={500}
      padding={40}
      radius="md"
      withCloseButton={false}
    >
      <Group justify="flex-end" mb={isSuccess ? 0 : 20}>
        <ActionIcon variant="subtle" color="gray" onClick={handleClose}>
          <IconX size={24} />
        </ActionIcon>
      </Group>

      {!isSuccess ? (
        <form onSubmit={form.onSubmit(handleRecover)}>
          <Stack gap={32} align="center">
            <Title order={2} style={{ fontFamily: "DIN Pro", fontSize: 24 }}>
              Восстановление пароля
            </Title>

            <TextInput
              label="Email"
              placeholder="Введите email"
              w="100%"
              {...form.getInputProps("email")}
            />

            <Button type="submit" size="lg" px={40} loading={isLoading}>
              Восстановить пароль
            </Button>
          </Stack>
        </form>
      ) : (
        <Stack align="center" gap={24} py={20}>
          <Title order={2} style={{ fontFamily: "DIN Pro", fontSize: 24 }}>
            Восстановление пароля
          </Title>
          <Text
            ta="center"
            size="lg"
            style={{ fontFamily: "PF Din Text Cond Pro" }}
          >
            На адрес{" "}
            <Text span fw={700}>
              {form.values.email}
            </Text>{" "}
            отправлено письмо с инструкцией по установке нового пароля.
          </Text>
          <Text
            ta="center"
            c="dimmed"
            size="md"
            style={{ fontFamily: "PF Din Text Cond Pro" }}
          >
            Если письмо не пришло, проверьте папку "Спам" или обратитесь в
            службу технической поддержки{" "}
            <Anchor href="mailto:support@ntc-tech.ru">
              support@ntc-tech.ru
            </Anchor>
          </Text>
          <Button size="md" px={60} onClick={handleClose}>
            OK
          </Button>
        </Stack>
      )}
    </Modal>
  );
};
