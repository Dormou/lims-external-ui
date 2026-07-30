import { useNavigate } from 'react-router-dom'
import { Box, Button, Center, SimpleGrid, Stack, Text } from '@mantine/core'
import { Icon } from '@iconify/react'
import { IconPlus } from '@tabler/icons-react'
import { RoutesPath } from '@/shared/config'
import { ApplicationCard, type ApplicationInfo } from '@/entities/application'

export const ApplicationCards = ({
  applications,
  isSearch,
}: {
  applications: ApplicationInfo[]
  isSearch: boolean
}) => {
  const navigate = useNavigate()

  if (applications.length > 0) {
    return (
      <SimpleGrid cols={3} spacing="xl">
        {applications.map((app) => (
          <ApplicationCard key={app.id} app={app} />
        ))}
      </SimpleGrid>
    )
  } else {
    return (
      <Center mt={100}>
        {isSearch && (
          <Text c="dimmed">По вашему запросу ничего не найдено</Text>
        )}
        {!isSearch && (
          <Stack align="center" gap="md">
            <Box opacity={0.3}>
              <Icon icon="mdi:database-off-outline" width={80} height={80} />
            </Box>
            <Text c="dimmed" size="lg" ta="center">
              Вы пока не подали ни одной заявки
            </Text>
            <Button
              variant="filled"
              leftSection={<IconPlus size={20} />}
              size="md"
              mt="xl"
              onClick={() => navigate(RoutesPath.CreateApplication)}
            >
              Подать заявку
            </Button>
          </Stack>
        )}
      </Center>
    )
  }
}
