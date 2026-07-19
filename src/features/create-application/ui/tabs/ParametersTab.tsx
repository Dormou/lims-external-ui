import { useDispatch, useSelector } from 'react-redux'
import { Table, TextInput, Select, Text, ScrollArea } from '@mantine/core'
import { setParameterValue } from '../../model/createApplicationSlice'
import { useGetMetadataQuery } from '../../api/createApplicationApi'
import type {
  EquipmentTypeMeta,
  ParameterMeta,
  TestMeta,
} from '../../model/types/branchMeta'
import type { ValueType } from '../../model/types/valueType'

export const ParametersTab = () => {
  const dispatch = useDispatch()

  const state = useSelector((state) => state.createApplication)

  const { data: metadata } = useGetMetadataQuery()

  const getActiveMetadata = () => {
    if (!metadata)
      return {
        parameters: [],
        tests: [],
      }

    const branch = metadata.find((b) => b.branchId === state.branchId)
    const equipment = branch?.equipmentTypes.find(
      (t: EquipmentTypeMeta) => t.equipmentTypeId === state.equipmentTypeId
    )

    return {
      parameters: (equipment?.parameters || []) as ParameterMeta[],
      tests: (equipment?.tests || []) as TestMeta[],
    }
  }

  // Находим параметры для выбранного типа оборудования
  const { parameters: activeParams } = getActiveMetadata()

  const renderInput = (param: ParameterMeta, objId: string) => {
    const value = state.parameters[param.parameterId]?.[objId] || ''

    const error = getValidationError(value, param)

    if (param.valueType.endsWith('List')) {
      return (
        <Select
          data={param.allowedValues || []}
          value={value}
          onChange={(val) =>
            dispatch(
              setParameterValue({
                paramId: param.parameterId,
                objId: objId,
                value: val || '',
              })
            )
          }
          placeholder="Выберите значение"
        />
      )
    }

    if (param.valueType === 'Constant') {
      return <TextInput value={value} disabled />
    }

    const minStr = param.minValue ? ` от ${param.minValue}` : ''
    const maxStr = param.maxValue ? ` до ${param.maxValue}` : ''

    if (param.valueType === 'Integer') {
      const placeholder = `Введите целое число${minStr}${maxStr}`

      return (
        <TextInput
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            dispatch(
              setParameterValue({
                paramId: param.parameterId,
                objId: objId,
                value: e.currentTarget.value,
              })
            )
          }
          error={error}
        />
      )
    }

    if (param.valueType === 'Decimal') {
      const placeholder = `Введите число${minStr}${maxStr}`

      return (
        <TextInput
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            dispatch(
              setParameterValue({
                paramId: param.parameterId,
                objId: objId,
                value: e.currentTarget.value,
              })
            )
          }
          error={error}
        />
      )
    }

    if (param.valueType === 'String') {
      const placeholder = `Введите строку${minStr}${maxStr} символов`

      return (
        <TextInput
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            dispatch(
              setParameterValue({
                paramId: param.parameterId,
                objId: objId,
                value: e.currentTarget.value,
              })
            )
          }
          error={error}
        />
      )
    }

    return (
      <TextInput
        value={value}
        placeholder="Введите значение"
        onChange={(e) =>
          dispatch(
            setParameterValue({
              paramId: param.parameterId,
              objId: objId,
              value: e.currentTarget.value,
            })
          )
        }
      />
    )
  }

  return (
    <ScrollArea mt="xl">
      <Table variant="simple" withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr bg="complementaryBlue">
            <Table.Th w={250}>Параметр</Table.Th>
            {state.objects.map((obj, idx) => (
              <Table.Th key={obj.id} ta="center">
                Объект №{idx + 1}
                <Text size="xs" c="dimmed" fw={400}>
                  {obj.name || 'Без названия'}
                </Text>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {activeParams.map((param) => (
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
              {state.objects.map((obj) => (
                <Table.Td key={obj.id}>
                  {renderInput(
                    { ...param, valueType: param.valueType as ValueType },
                    obj.id
                  )}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
}

const getValidationError = (value: string, param: ParameterMeta) => {
  if (!value) return null // Если пусто, ошибку не показываем (или покажем при нажатии 'Отправить')

  const { valueType, minValue, maxValue } = param
  const numValue = Number(value.replace(',', '.')) // заменяем запятую на точку для парсинга

  if (valueType === 'Integer') {
    if (!Number.isInteger(numValue)) return 'Введите целое число'
    if (minValue && numValue < Number(minValue)) return `Минимум: ${minValue}`
    if (maxValue && numValue > Number(maxValue)) return `Максимум: ${maxValue}`
  }

  if (valueType === 'Decimal') {
    if (isNaN(numValue)) return 'Введите число'
    if (minValue && numValue < Number(minValue)) return `Минимум: ${minValue}`
    if (maxValue && numValue > Number(maxValue)) return `Максимум: ${maxValue}`
  }

  if (valueType === 'String') {
    if (minValue && value.length < Number(minValue))
      return `Минимум символов: ${minValue}`
    if (maxValue && value.length > Number(maxValue))
      return `Максимум символов: ${maxValue}`
  }

  return null // Ошибок нет
}
