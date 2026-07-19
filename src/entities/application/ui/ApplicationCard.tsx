import { useNavigate } from 'react-router-dom'
import { Paper, Title, Stack, Text, Divider, Group } from '@mantine/core'
import { RoutesPath } from '@/shared/config'
import type { ApplicationInfo } from '../model/types/applicationInfo'
import styles from './ApplicationCard.module.css'

export const ApplicationCard = ({ app }: { app: ApplicationInfo }) => {
  const navigate = useNavigate()

  const isDraft = app.status === 'Черновик'

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      shadow="sm"
      display="flex"
      h="100%"
      mih={220}
      className={styles.appCardContent}
      onClick={() => navigate(`${RoutesPath.CreateApplication}?id=${app.id}`)}
      onMouseEnter={(e) =>
        isDraft && (e.currentTarget.style.transform = 'translateY(-4px)')
      }
      onMouseLeave={(e) =>
        isDraft && (e.currentTarget.style.transform = 'translateY(0)')
      }
    >
      <Title order={4} c="primaryBlue" mb="md">
        {app.equipmentType}
      </Title>

      <Stack gap={4} style={{ flex: 1 }}>
        {app.samples &&
          app.samples.slice(0, 3).map((sample, idx) => (
            <Text key={idx} size="sm" c="dimmed" lineClamp={1}>
              {sample}
            </Text>
          ))}
        {app.samples && app.samples.length > 3 && (
          <Text size="xs" c="dimmed">
            ...
          </Text>
        )}
      </Stack>

      <Divider my="sm" />

      <Group justify="space-between" align="center">
        <Text fw={500} size="sm" c={isDraft ? 'dimmed' : 'primaryBlue'}>
          {app.status}
        </Text>
        <Text size="xs" c="dimmed">
          {new Date(app.updatedAt).toLocaleDateString('ru-RU')}
        </Text>
      </Group>
    </Paper>
  )
}
