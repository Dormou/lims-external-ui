import { Table, Checkbox, Text, ScrollArea } from "@mantine/core"
import { useGetMetadataQuery } from '../../../api/references/referencesApi';
import { useAppDispatch, useAppSelector } from '../../../store'
import { applicationsSlice } from '../applicationStore'

export const TestsTab = () => {
  const dispatch = useAppDispatch()

  const { data: metadata } = useGetMetadataQuery()

  const { objects, tests, branchId, equipmentTypeId } = useAppSelector((state) => state.applicationsSlice)

  const activeTests =
    metadata?.find((b) => b.branchId === branchId)
      ?.equipmentTypes.find((t) => t.equipmentTypeId === equipmentTypeId)
      ?.tests || []

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
                      dispatch(applicationsSlice.actions.setTestValue({ testId: test.testId, objId: obj.id, value: e.currentTarget.checked }))
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
