import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Table, Checkbox, Text, ScrollArea } from '@mantine/core'
import { useGetMetadataQuery } from '../../api/createApplicationApi'
import { getActiveMeta } from '../../lib/helpers'
import { WarningTab } from './components/WarningTab'
import type { DraftForm } from '../../model/draftSchema'

export const TestsTab = () => {
  const { data: metadata } = useGetMetadataQuery()
  const { getValues, control } = useFormContext<DraftForm>()

  // Список тестов в зависимости от выбранного типа оборудования
  const activeTests = useMemo(() => {
    return (
      getActiveMeta(
        metadata,
        getValues('branchId'),
        getValues('equipmentTypeId')
      )?.tests ?? null
    )
  }, [metadata])

  if (getValues('samples').length === 0)
    return (
      <WarningTab text="Укажите хотя бы один объект испытаний в разделе Общая информация" />
    )
  else if (!activeTests)
    return (
      <WarningTab text="Выберете тип устройства в разделе Общая информация" />
    )
  else
    return (
      <ScrollArea mt="md" offsetScrollbars="y" h="stretch" w="stretch">
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr bg="complementaryBlue">
              <Table.Th w={300}>Наименование испытания</Table.Th>
              {getValues('samples').map((sample, index) => (
                <Table.Th key={`sample-show[${index}]`} ta="center">
                  Объект №{index + 1}
                  <Text size="xs" c="dimmed" fw={400}>
                    {sample.name ?? 'Без названия'}
                  </Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {activeTests?.map((test, testIndex) => (
              <Table.Tr key={test.testId}>
                <Table.Td>
                  <Text size="sm">{test.testName}</Text>
                  <Text size="xs" c="dimmed">
                    {test.testMethod}
                  </Text>
                </Table.Td>
                {getValues('samples').map((_, sampleIndex) => (
                  <Table.Td key={`${test.testId}${sampleIndex}`} ta="center">
                    <Controller
                      name={`samples.${sampleIndex}.testValues.${testIndex}.testValue`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox checked={value} onChange={onChange} />
                      )}
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
