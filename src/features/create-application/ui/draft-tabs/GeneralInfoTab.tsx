import {
  Stack,
  Select,
  TextInput,
  Button,
  ActionIcon,
  Text,
  Title,
  Group,
  Anchor,
  ScrollArea,
  Box,
} from '@mantine/core'
import { IconTrash, IconPlus } from '@tabler/icons-react'
import { Controller, FieldArray, useFormContext } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useGetMetadataQuery } from '../../api/createApplicationApi'
import { getActiveMeta, getEmptyParams, getEmptyTests } from '../../lib/helpers'
import type { DraftForm, SampleForm } from '../../model/draftSchema'

export const GeneralInfoTab = () => {
  const { data: metadata } = useGetMetadataQuery()

  const { getValues, setValue, control, watch, formState } =
    useFormContext<DraftForm>()
  const { errors } = formState

  const branchId = watch('branchId')
  const equipmentTypeId = watch('equipmentTypeId')

  const branchData = useMemo(
    () =>
      metadata?.map((branch) => ({
        value: branch.branchId,
        label: branch.branchName,
      })) ?? [],
    [metadata]
  )

  const equipmentData = useMemo(
    () =>
      metadata
        ?.find((branch) => branch.branchId === branchId)
        ?.equipmentTypes?.map((type) => ({
          value: type.equipmentTypeId,
          label: type.equipmentTypeName,
        })) ?? [],
    [metadata, branchId]
  )

  // Обнуляем параметры и тесты при смене типа оборудования
  useEffect(() => {
    const samples = getValues('samples')
    if (samples.length == 0) return

    const activeMeta = getActiveMeta(metadata, branchId, equipmentTypeId)

    // Смена параметров и тестов
    if (activeMeta) {
      samples.forEach((_, index) => {
        setValue(`samples.${index}.parameterValues`, getEmptyParams(activeMeta))
        setValue(`samples.${index}.testValues`, getEmptyTests(activeMeta))
      })
    }
    // Полное удаление
    else {
      samples.forEach((_, index) => {
        setValue(`samples.${index}.parameterValues`, [])
        setValue(`samples.${index}.testValues`, [])
      })
    }
  }, [equipmentTypeId])

  // Создание объекта с пустыми параметрами и тестами в зависимости от текущего типа оборудования
  const getNewSample = (): SampleForm => {
    const newSample: SampleForm = {
      id: uuidV4(),
      name: '',
      parameterValues: [],
      testValues: [],
    }

    const activeMeta = getActiveMeta(metadata, branchId, equipmentTypeId)
    if (activeMeta) {
      newSample.parameterValues = getEmptyParams(activeMeta)
      newSample.testValues = getEmptyTests(activeMeta)
    }

    return newSample
  }

  // Очистить поле с типом оборудования
  const handleRemoveEquipmentType = () => {
    setValue('equipmentTypeId', '')
  }

  return (
    <ScrollArea mt="xl">
      <Stack gap={8}>
        <Text size="sm" ta="center">
          Типы испытаний, выполняемые различными филиалами, представлены на
          сайте -
          <Anchor
            href="https://ntc-power.ru/about/structure/testing-certification/"
            target="_blank"
            ml={5}
          >
            <u>типы испытаний, выполняемые в филиалах</u>
          </Anchor>
        </Text>

        <Controller
          name="branchId"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <Select
              label="Филиал подачи заявки"
              placeholder="Выберите филиал"
              required
              data={branchData}
              value={value}
              onChange={(e) => {
                onChange(e)
                handleRemoveEquipmentType()
              }}
              error={fieldState.error?.message ? ' ' : undefined}
            />
          )}
        />

        <Text size="sm" ta="center">
          Если необходимый тип устройства отсутствует в списке, следуйте
          <Anchor
            href="https://ntc-power.ru/about/structure/testing-certification/poryadok-podachi/"
            target="_blank"
            ml={5}
          >
            <u>Порядку подачи заявок</u>
          </Anchor>
        </Text>

        <Controller
          name="equipmentTypeId"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <Select
              label="Тип устройства"
              placeholder="Выберите тип устройства"
              required
              disabled={!branchId}
              data={equipmentData}
              value={value}
              onChange={onChange}
              error={fieldState.error?.message ? ' ' : undefined}
            />
          )}
        />

        <Controller
          name="producerName"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <TextInput
              label="Предприятие-изготовитель"
              placeholder="Введите полное наименование предприятия-изготовителя"
              required
              value={value}
              onChange={onChange}
              error={fieldState.error?.message ? ' ' : undefined}
            />
          )}
        />

        <Controller
          name="producerAddress"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <TextInput
              label="Адрес производства"
              placeholder="Введите адрес производственной площадки изготовителя"
              required
              value={value}
              onChange={onChange}
              error={fieldState.error?.message ? ' ' : undefined}
            />
          )}
        />

        <FieldArray
          name="samples"
          control={control}
          render={({ fields, append, remove }) => (
            <>
              <Group justify="space-between">
                <Box>
                  <Title order={5}>
                    Объекты испытаний (ОИ) {fields.length}
                  </Title>
                  <Text c="errorRed" size="xs">
                    {errors.samples?.message}
                  </Text>
                </Box>
                <Button
                  variant="outline"
                  leftSection={<IconPlus size={16} />}
                  onClick={() => append(getNewSample())}
                  disabled={fields.length >= 12}
                >
                  Добавить объект испытаний
                </Button>
              </Group>
              {fields.map((fieldItem, index) => (
                <Group key={fieldItem.id} align="flex-end">
                  <Controller
                    name={`samples.${index}.name`}
                    control={control}
                    render={({ field: { value, onChange }, fieldState }) => (
                      <TextInput
                        label={`Полное наименование объекта испытаний №${index + 1}`}
                        placeholder="Введите полное наименование образца/типопредставителя согласно технической документации"
                        required
                        flex={1}
                        value={value}
                        onChange={onChange}
                        error={fieldState.error?.message ? ' ' : undefined}
                      />
                    )}
                  />
                  {fields.length > 1 && (
                    <ActionIcon
                      color="errorRed"
                      variant="subtle"
                      size="lg"
                      onClick={() => remove(index)}
                    >
                      <IconTrash size={20} />
                    </ActionIcon>
                  )}
                </Group>
              ))}
            </>
          )}
        />
      </Stack>
    </ScrollArea>
  )
}
