import { Select, TextInput, NumberInput } from '@mantine/core'
import { Controller, type Control } from 'react-hook-form'
import type { ParameterMeta } from '@/entities/metadata'
import type { DraftForm } from '../../../model/draftSchema'

export interface RenderInputProps {
  param: ParameterMeta
  paramIndex: number
  sampleIndex: number
  control: Control<DraftForm>
}

const renderSelectInput = ({
  control,
  param,
  paramIndex,
  sampleIndex,
}: RenderInputProps) => (
  <Controller
    name={`samples.${sampleIndex}.parameterValues.${paramIndex}.parameterValue`}
    control={control}
    render={({ field: { value, onChange }, fieldState }) => (
      <Select
        data={param.allowedValues ?? []}
        value={value}
        onChange={onChange}
        placeholder="Выберите значение"
        error={fieldState.error?.message}
      />
    )}
  />
)

const renderStringInput = ({
  control,
  param,
  paramIndex,
  sampleIndex,
}: RenderInputProps) => (
  <Controller
    name={`samples.${sampleIndex}.parameterValues.${paramIndex}.parameterValue`}
    control={control}
    render={({ field: { value, onChange }, fieldState }) => {
      const minStr = param.minValue ? ` от ${param.minValue}` : ''
      const maxStr = param.maxValue ? ` до ${param.maxValue}` : ''
      return (
        <TextInput
          value={value as string}
          placeholder={`Введите строку${minStr}${maxStr} символов`}
          onChange={onChange}
          error={fieldState.error?.message}
          maxLength={param.maxValue ?? undefined}
        />
      )
    }}
  />
)

const renderNumberInput = ({
  control,
  param,
  paramIndex,
  sampleIndex,
}: RenderInputProps) => (
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
          value={value as string}
          placeholder={placeholder}
          onChange={(e) => onChange(e.toString())}
          allowDecimal={param.valueType !== 'Integer'}
          error={fieldState.error?.message}
        />
      )
    }}
  />
)

const renderConstInput = ({
  control,
  paramIndex,
  sampleIndex,
}: RenderInputProps) => (
  <Controller
    name={`samples.${sampleIndex}.parameterValues.${paramIndex}.parameterValue`}
    control={control}
    render={({ field: { value } }) => {
      return <TextInput value={value as string} disabled />
    }}
  />
)

// Селектор компонента в зависимости от типа value
export const RenderInputs = (props: RenderInputProps) => {
  switch (props.param.valueType) {
    case 'Constant':
      return renderConstInput(props)
    case 'DecimalList':
      return renderSelectInput(props)
    case 'IntegerList':
      return renderSelectInput(props)
    case 'StringList':
      return renderSelectInput(props)
    case 'Decimal':
      return renderNumberInput(props)
    case 'Integer':
      return renderNumberInput(props)
    case 'String':
      return renderStringInput(props)
    default:
      return renderStringInput(props)
  }
}
