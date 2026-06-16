import { Stack, Title, Text, Group, Button, Divider, Box } from '@mantine/core'

interface ProfileSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  onSave: () => void
  onReset: () => void
  isDirty: boolean // Изменены ли данные в этом блоке
}

export const ProfileSection = ({
  title,
  description,
  children,
  onSave,
  onReset,
  isDirty,
}: ProfileSectionProps) => {
  return (
    <Box>
      <Title order={3} c="#005B9C" mb={4}>
        {title}
      </Title>
      {description && (
        <Text size="xs" c="dimmed" mb={16}>
          {description}
        </Text>
      )}

      <Stack gap="md">{children}</Stack>

      {isDirty && (
        <Group justify="flex-end" mt="md">
          <Button variant="outline" color="gray" onClick={onReset}>
            Сбросить изменения
          </Button>
          <Button variant="filled" onClick={onSave}>
            Сохранить изменения
          </Button>
        </Group>
      )}
      <Divider mt="xl" mb="xl" />
    </Box>
  )
}
