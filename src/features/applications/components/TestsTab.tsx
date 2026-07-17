import { Table, Checkbox, Text, ScrollArea } from '@mantine/core'
import { useGetMetadataQuery } from '@/entities/reference/api/referencesApi'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { applicationsSlice } from '../applicationSlice'

import { getUXTID } from '@/processes/pages/ApplicationsPage.test'

export const TestsTab = () => {
  const dispatch = useAppDispatch()

  const { data: metadata } = useGetMetadataQuery()

  const { objects, tests, branchId, equipmentTypeId } = useAppSelector(
    (state) => state.Applications
  )

  const activeTests = metadata
      ?.find((b) => b.branchId === branchId)
      ?.equipmentTypes.find((t) => t.equipmentTypeId === equipmentTypeId)
      ?.tests || []

  return (
    <ScrollArea mt="xl">
      <Table ux-test-id={getUXTID("table-tests")} withColumnBorders withTableBorder>
        <Table.Thead ux-test-id={getUXTID("tests-header")}>
          <Table.Tr bg="gray.0">
            <Table.Th ux-test-id={getUXTID("tests-col")} w={300}>Наименование испытания</Table.Th>
            {objects.map((obj, idx) => (
              <Table.Th ux-test-id={getUXTID("objs-cols")} key={obj.id} ta="center">
                {/* WARN!!! Edited for E2ETest */}
                <div ux-test-id={getUXTID("obj-col")}>№{idx + 1}</div>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {activeTests.map((test: any) => (
            <Table.Tr ux-test-id={getUXTID("test-row")} key={test.testId}>
              <Table.Td ux-test-id={getUXTID("test")}>
                <Text ux-test-id={getUXTID("test-name")} size="sm">{test.testName}</Text>
                <Text size="xs" c="dimmed">
                  {test.testMethod}
                </Text>
              </Table.Td>
              {objects.map((obj: any) => (
                <Table.Td key={obj.id} ta="center">
                  <Checkbox
                    checked={tests[test.testId]?.[obj.id] || false}
                    onChange={(e) =>
                      dispatch(
                        applicationsSlice.actions.setTestValue({
                          testId: test.testId,
                          objId: obj.id,
                          value: e.currentTarget.checked,
                        })
                      )
                    }
                  />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
}
