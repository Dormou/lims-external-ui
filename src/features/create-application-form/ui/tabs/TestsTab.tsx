import { useDispatch, useSelector } from 'react-redux'
import { Table, Checkbox, Text, ScrollArea } from '@mantine/core'
import { setTestValue } from '../../model/createApplicationSlice'
import { useGetMetadataQuery } from '../../api/createApplicationApi'

export const TestsTab = () => {
  const dispatch = useDispatch()

  const { data: metadata } = useGetMetadataQuery()

  const { objects, tests, branchId, equipmentTypeId } = useSelector(
    (state) => state.createApplication
  )

  const activeTests =
    metadata
      ?.find((b) => b.branchId === branchId)
      ?.equipmentTypes.find((t) => t.equipmentTypeId === equipmentTypeId)
      ?.tests || []

  return (
    <ScrollArea mt="xl">
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr bg="complementaryBlue">
            <Table.Th w={300}>Наименование испытания</Table.Th>
            {objects.map((obj: any, idx: any) => (
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
              {objects.map((obj: any) => (
                <Table.Td key={obj.id} ta="center">
                  <Checkbox
                    checked={tests[test.testId]?.[obj.id] || false}
                    onChange={(e) =>
                      dispatch(
                        setTestValue({
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
