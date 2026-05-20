import { Table, Checkbox, Text, ScrollArea } from "@mantine/core";
import { useApplicationStore } from "../applicationStore";

export const TestsTab = () => {
  const { objects, tests, setTestValue, metadata, branchId, equipmentTypeId } =
    useApplicationStore();

  const activeTests =
    metadata
      .find((b) => b.branchId === branchId)
      ?.equipmentTypes.find((t) => t.equipmentTypeId === equipmentTypeId)
      ?.tests || [];

  return (
    <ScrollArea mt="xl">
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr bg="gray.0">
            <Table.Th w={300}>Наименование испытания</Table.Th>
            {objects.map((obj, idx) => (
              <Table.Th key={obj.id} ta="center">
                №{idx + 1}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {activeTests.map((test: any) => (
            <Table.Tr key={test.testId}>
              <Table.Td>
                <Text size="sm">{test.testName}</Text>
                <Text size="xs" c="dimmed">
                  {test.testMethod}
                </Text>
              </Table.Td>
              {objects.map((obj) => (
                <Table.Td key={obj.id} ta="center">
                  <Checkbox
                    checked={tests[test.testId]?.[obj.id] || false}
                    onChange={(e) =>
                      setTestValue(test.testId, obj.id, e.currentTarget.checked)
                    }
                  />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
