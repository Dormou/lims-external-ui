import { useEffect, useState, useMemo } from "react";
import {
  Title,
  TextInput,
  Button,
  Group,
  Stack,
  SimpleGrid,
  Center,
  Text,
  Box,
} from "@mantine/core";
import { IconSearch, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ApplicationCard } from "../features/applications/components/ApplicationCard";
import { Icon } from "@iconify/react";
import { ApplicationApi } from "../features/applications/applicationApi";

export const HomePage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    ApplicationApi.getAllApplications()
      .then((result) => setApplications(result))
      .catch((err) => {
        console.error("Ошибка при загрузке:", err);
        setApplications([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredApps = useMemo(() => {
    if (!applications?.length) return [];

    return applications
      .filter((app) => {
        const query = search.toLowerCase();
        const matchesType = app.equipmentType?.toLowerCase().includes(query);
        const matchesSamples = app.samples?.some((s: string) =>
          s.toLowerCase().includes(query),
        );
        return matchesType || matchesSamples;
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  }, [applications, search]);

  if (isLoading)
    return (
      <Center h={400}>
        <Text>Загрузка заявок...</Text>
      </Center>
    );

  return (
    <Stack gap={40} w="100%">
      <Title order={2} ta="center">
        Заявки на проведение испытаний
      </Title>

      {applications?.length > 0 && (
        <Group justify="space-between">
          <TextInput
            placeholder="Поиск"
            leftSection={<IconSearch size={16} />}
            w={600}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Button
            leftSection={<IconPlus size={20} />}
            onClick={() => navigate("/create-application")}
          >
            Подать заявку
          </Button>
        </Group>
      )}

      {!applications || applications.length === 0 ? (
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
              onClick={() => navigate("/create-application")}
            >
              Подать заявку
            </Button>
          </Stack>
        </Center>
      ) : filteredApps.length === 0 ? (
        <Center mt={100}>
          <Text c="dimmed">По вашему запросу ничего не найдено</Text>
        </Center>
      ) : (
        <SimpleGrid cols={3} spacing="xl">
          {filteredApps.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};
