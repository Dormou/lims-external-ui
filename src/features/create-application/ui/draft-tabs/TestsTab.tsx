import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Table, Checkbox, Text } from '@mantine/core'
import { useGetMetadataQuery } from '../../api/createApplicationApi'
import { getActiveMeta } from '../../lib/helpers'
import { WarningTab } from './components/WarningTab'
import type { DraftForm } from '../../model/draftSchema'

export const TestsTab = () => {
  const { data: metadata } = useGetMetadataQuery()

  const { getValues, control, watch } = useFormContext<DraftForm>()

  const equipmentTypeId = watch('equipmentTypeId')

  // Список тестов в зависимости от выбранного типа оборудования
  const activeTests = useMemo(() => {
    return (
      getActiveMeta(metadata, getValues('branchId'), equipmentTypeId)?.tests ??
      null
    )
  }, [metadata, equipmentTypeId])

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
      <Table withColumnBorders withTableBorder mt="xl">
        <Table.Thead>
          <Table.Tr bg="complementaryBlue">
            <Table.Th w={300}>Наименование испытания</Table.Th>
            {getValues('samples').map((sample, index) => (
              <Table.Th key={sample.id} ta="center">
                №{index + 1}
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
              {getValues('samples').map((sample, sampleIndex) => (
                <Table.Td key={`${sample.id}${testIndex}`} ta="center">
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
    )
}
