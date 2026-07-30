import { useNavigate } from 'react-router-dom'
import { Button, Center, Group, Stack, Text, Title } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useGetAllApplicationsQuery } from '@/entities/application'
import { SearchInput } from '@/shared/ui'
import { useSearch } from '@/shared/lib'
import { RoutesPath } from '@/shared/config'
import { ApplicationCards } from './components/ApplicationCards'
import type { ApplicationInfo } from '@/entities/application'

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

      <ApplicationCards applications={result} isSearch={isSearch} />
    </Stack>
  )
}
