import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Center,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { Icon } from '@iconify/react'
import { useGetAllApplicationsQuery } from '../api/applicationsListApi'
import { SearchInput } from '@/shared/ui'
import { useSearch } from '@/shared/lib'
import { RoutesPath } from '@/shared/config'
import { ApplicationCard } from './ApplicationCard/ApplicationCard'
import type { ApplicationInfo } from '../model/applicationInfo'

export const ApplicationsList = () => {
  const navigate = useNavigate()

  const { data, isFetching } = useGetAllApplicationsQuery()

  const { search, setSearch, result, isSearch } = useSearch<ApplicationInfo>({
    data: data,
    filterFn: (value, search) => {
      const query = search.toLowerCase()
      const matchesType = value.equipmentType?.toLowerCase().includes(query)
      const matchesSamples = value.samples?.some((s: string) =>
        s.toLowerCase().includes(query)
      )
      return matchesType || !!matchesSamples
    },
    sortFn: (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  })

  if (isFetching)
    return (
      <Center h={400}>
        <Text>Загрузка заявок...</Text>
      </Center>
    )

  return (
    <Stack gap={40} w="100%">
      <Title order={2} ta="center">
        Заявки на проведение испытаний
      </Title>

      {data && data?.length > 0 && (
        <Group justify="space-between">
          <SearchInput
            value={search}
            onChange={(value) => setSearch(value)}
            onClear={() => setSearch('')}
          />
          <Button
            leftSection={<IconPlus size={20} />}
            onClick={() => navigate(RoutesPath.CreateApplication)}
          >
            Подать заявку
          </Button>
        </Group>
      )}

      {result.length > 0 && (
        <SimpleGrid cols={3} spacing="xl">
          {result.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </SimpleGrid>
      )}
      {result.length === 0 && isSearch && (
        <Center mt={100}>
          <Text c="dimmed">По вашему запросу ничего не найдено</Text>
        </Center>
      )}
      {result.length === 0 && !isSearch && (
        <Center mt={100}>
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
        </Center>
      )}
    </Stack>
  )
}
