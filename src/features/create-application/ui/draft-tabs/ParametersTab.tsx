import { Table, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetMetadataQuery } from '../../api/createApplicationApi'
import { getActiveMeta } from '../../lib/helpers'
import { WarningTab } from './components/WarningTab'
import { RenderInputs } from './components/RenderInputs'
import type { DraftForm } from '../../model/draftSchema'

export const ParametersTab = () => {
  const { data: metadata } = useGetMetadataQuery()
  const { getValues, control } = useFormContext<DraftForm>()

  // Список параметров в зависимости от выбранного типа оборудования
  const activeParameters = useMemo(() => {
    return (
      getActiveMeta(
        metadata,
        getValues('branchId'),
        getValues('equipmentTypeId')
      )?.parameters ?? null
    )
  }, [metadata])

  if (getValues('samples').length === 0)
    return (
      <WarningTab text="Укажите хотя бы один объект испытаний в разделе Общая информация" />
    )
  else if (!activeParameters)
    return (
      <WarningTab text="Выберете тип устройства в разделе Общая информация" />
    )
  else
    return (
      <Table withColumnBorders withTableBorder mt="xl">
        <Table.Thead>
          <Table.Tr bg="complementaryBlue">
            <Table.Th w={250}>Параметр</Table.Th>
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
          {activeParameters?.map((param, paramIndex) => (
            <Table.Tr key={param.parameterId}>
              <Table.Td>
                <Text size="sm" fw={500}>
                  {param.parameterName}
                </Text>
                {param.parameterUnit && (
                  <Text size="xs" c="dimmed">
                    {param.parameterUnit}
                  </Text>
                )}
              </Table.Td>
              {getValues('samples').map((_, sampleIndex) => (
                <Table.Td key={`${param.parameterId}${sampleIndex}`}>
                  <RenderInputs
                    control={control}
                    param={param}
                    paramIndex={paramIndex}
                    sampleIndex={sampleIndex}
                  />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    )
}
