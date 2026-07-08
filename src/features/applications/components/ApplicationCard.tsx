import { useNavigate } from 'react-router-dom'
import { Paper, Title, Stack, Text, Divider, Group } from '@mantine/core'

import type { ApplicationInfo } from '../api/types/types'

interface ApplicationCardProps {
  app: ApplicationInfo
}

export const ApplicationCard = ({ app }: ApplicationCardProps) => {
  const navigate = useNavigate()
  const isDraft = app.status === 'Черновик'

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      shadow="sm"
      onClick={() => navigate(`/create-application?id=${app.id}`)}
      
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 220,
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}

      onMouseEnter={(e) =>
        isDraft && (e.currentTarget.style.transform = 'translateY(-4px)')
      }

      onMouseLeave={(e) =>
        isDraft && (e.currentTarget.style.transform = 'translateY(0)')
      }
    >
      <Title order={4} c="#005B9C" mb="md">
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
        <Text fw={500} size="sm" c={isDraft ? '#ADB5BD' : '#005B9C'}>
          {app.status}
        </Text>
        <Text size="xs" c="dimmed">
          {new Date(app.updatedAt).toLocaleDateString('ru-RU')}
        </Text>
      </Group>
    </Paper>
  )
}
