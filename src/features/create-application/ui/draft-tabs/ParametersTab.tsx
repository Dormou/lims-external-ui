import { Table, TextInput, Select, Text, NumberInput } from '@mantine/core'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useGetMetadataQuery } from '../../api/createApplicationApi'
import { getActiveMeta } from '../../lib/helpers'
import { WarningTab } from './components/WarningTab'
import type { ParameterMeta } from '../../model/types/branchMeta'
import type { DraftForm } from '../../model/draftSchema'

export const ParametersTab = () => {
  const { data: metadata } = useGetMetadataQuery()

  const { getValues, control, watch } = useFormContext<DraftForm>()

  const equipmentTypeId = watch('equipmentTypeId')

  // Список параметров в зависимости от выбранного типа оборудования
  const activeParameters = useMemo(() => {
    return (
      getActiveMeta(metadata, getValues('branchId'), equipmentTypeId)
        ?.parameters ?? null
    )
  }, [metadata, equipmentTypeId])

  const renderSelectInput = (
    param: ParameterMeta,
    paramIndex: number,
    sampleIndex: number
  ) => (
    <Controller
      name={`samples.${sampleIndex}.parameterValues.${paramIndex}.parameterValue`}
      control={control}
      render={({ field: { value, onChange }, fieldState }) => (
        <Select
          data={param.allowedValues ?? []}
          value={value}
          onChange={onChange}
          placeholder="Выберите значение"
          error={fieldState.error?.message ? ' ' : undefined}
        />
      )}
    />
  )

  const renderStringInput = (
    param: ParameterMeta,
    paramIndex: number,
    sampleIndex: number
  ) => (
    <Controller
      name={`samples.${sampleIndex}.parameterValues.${paramIndex}.parameterValue`}
      control={control}
      render={({ field: { value, onChange }, fieldState }) => {
        const minStr = param.minValue ? ` от ${param.minValue}` : ''
        const maxStr = param.maxValue ? ` до ${param.maxValue}` : ''
        return (
          <TextInput
            value={value}
            placeholder={`Введите строку${minStr}${maxStr} символов`}
            onChange={onChange}
            error={fieldState.error?.message ? ' ' : undefined}
            maxLength={param.maxValue ?? undefined}
          />
        )
      }}
    />
  )

  const renderNumberInput = (
    param: ParameterMeta,
    paramIndex: number,
    sampleIndex: number
  ) => (
    <Controller
      name={`samples.${sampleIndex}.parameterValues.${paramIndex}.parameterValue`}
      control={control}
      render={({ field: { value, onChange }, fieldState }) => {
        const minStr = param.minValue ? ` от ${param.minValue}` : ''
        const maxStr = param.maxValue ? ` до ${param.maxValue}` : ''
        const placeholder =
          param.valueType === 'Integer'
            ? `Введите целое число${minStr}${maxStr}`
            : `Введите число${minStr}${maxStr}`
        return (
          <NumberInput
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.toString())}
            allowDecimal={param.valueType !== 'Integer'}
            error={fieldState.error?.message ? ' ' : undefined}
            min={param.minValue ?? undefined}
            max={param.maxValue ?? undefined}
          />
        )
      }}
    />
  )

  const renderConstInput = (paramIndex: number, sampleIndex: number) => (
    <Controller
      name={`samples.${sampleIndex}.parameterValues.${paramIndex}.parameterValue`}
      control={control}
      render={({ field: { value } }) => {
        return <TextInput value={value} disabled />
      }}
    />
  )

  const renderInput = (
    param: ParameterMeta,
    paramIndex: number,
    sampleIndex: number
  ) => {
    switch (param.valueType) {
      case 'Constant':
        return renderConstInput(paramIndex, sampleIndex)
      case 'DecimalList':
        return renderSelectInput(param, paramIndex, sampleIndex)
      case 'IntegerList':
        return renderSelectInput(param, paramIndex, sampleIndex)
      case 'StringList':
        return renderSelectInput(param, paramIndex, sampleIndex)
      case 'Decimal':
        return renderNumberInput(param, paramIndex, sampleIndex)
      case 'Integer':
        return renderNumberInput(param, paramIndex, sampleIndex)
      case 'String':
        return renderStringInput(param, paramIndex, sampleIndex)
      default:
        return renderStringInput(param, paramIndex, sampleIndex)
    }
  }

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
              <Table.Th key={sample.id} ta="center">
                Объект №{index + 1}
                <Text size="xs" c="dimmed" fw={400}>
                  {sample.name === '' ? 'Без названия' : sample.name}
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
              {getValues('samples').map((sample, sampleIndex) => (
                <Table.Td key={`${sample.id}${paramIndex}`}>
                  {renderInput(param, paramIndex, sampleIndex)}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    )
}

// const getValidationError = (value: string, param: ParameterMeta) => {
//   if (!value) return null // Если пусто, ошибку не показываем (или покажем при нажатии 'Отправить')

//   const { valueType, minValue, maxValue } = param
//   const numValue = Number(value.replace(',', '.')) // заменяем запятую на точку для парсинга

//   if (valueType === 'Integer') {
//     if (!Number.isInteger(numValue)) return 'Введите целое число'
//     if (minValue && numValue < Number(minValue)) return `Минимум: ${minValue}`
//     if (maxValue && numValue > Number(maxValue)) return `Максимум: ${maxValue}`
//   }

//   if (valueType === 'Decimal') {
//     if (isNaN(numValue)) return 'Введите число'
//     if (minValue && numValue < Number(minValue)) return `Минимум: ${minValue}`
//     if (maxValue && numValue > Number(maxValue)) return `Максимум: ${maxValue}`
//   }

//   if (valueType === 'String') {
//     if (minValue && value.length < Number(minValue))
//       return `Минимум символов: ${minValue}`
//     if (maxValue && value.length > Number(maxValue))
//       return `Максимум символов: ${maxValue}`
//   }

//   return null // Ошибок нет
// }
