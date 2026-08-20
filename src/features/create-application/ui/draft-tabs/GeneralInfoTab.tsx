import {
  Stack,
  Select,
  TextInput,
  Button,
  ActionIcon,
  Text,
  Group,
  Anchor,
  ScrollArea,
  Collapse,
} from '@mantine/core'
import { IconTrash, IconPlus } from '@tabler/icons-react'
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { useMemo } from 'react'
import { useGetMetadataQuery } from '@/entities/metadata'
import { getActiveMeta, getEmptyParams, getEmptyTests } from '../../lib/helpers'
import { useDisclosure } from '@mantine/hooks'
import { Icon } from '@iconify/react'
import type { DraftForm, SampleForm } from '../../model/draftSchema'

export const GeneralInfoTab = () => {
  const { data: metadata } = useGetMetadataQuery()

  const { getValues, setValue, control, formState } =
    useFormContext<DraftForm>()

  const branchId = useWatch({ control: control, name: 'branchId' })

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'samples',
  })

  // Данные для селекта филиала
  const branchData = useMemo(
    () =>
      metadata?.map((branch) => ({
        value: branch.branchId,
        label: branch.branchName,
      })) ?? [],
    [metadata]
  )

  // Данные для селекта типа оборудования
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

  const [samplesExpand, { toggle }] = useDisclosure(true)

  // Создание сэмпла с пустыми параметрами и тестами в зависимости от текущего типа оборудования
  const getNewSample = (): SampleForm => {
    const newSample: SampleForm = {
      name: '',
      parameterValues: [],
      testValues: [],
    }

    const activeMeta = getActiveMeta(
      metadata,
      branchId,
      getValues('equipmentTypeId')
    )
    if (activeMeta) {
      newSample.parameterValues = getEmptyParams(activeMeta)
      newSample.testValues = getEmptyTests(activeMeta)
    }

    return newSample
  }

  // Очистить сэмплы
  const clearSamples = () => {
    getValues('samples').forEach((_, index) => {
      setValue(`samples.${index}.parameterValues`, [])
      setValue(`samples.${index}.testValues`, [])
    })
  }

  // Поменять на чистые сэмплы в зависимости от оборудования
  const swapSamples = (id: string | null) => {
    if (!id) {
      clearSamples()
      return
    }

    const activeMeta = getActiveMeta(metadata, branchId, id)
    if (!activeMeta) {
      console.log('Текущий филиал или тип оборудования не найден в метаданных')
      clearSamples()
      return
    }

    getValues('samples').forEach((_, index) => {
      setValue(`samples.${index}.parameterValues`, getEmptyParams(activeMeta))
      setValue(`samples.${index}.testValues`, getEmptyTests(activeMeta))
    })
  }

  return (
    <ScrollArea mt="md" offsetScrollbars="y" h="stretch">
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
                setValue('equipmentTypeId', null)
                clearSamples()
              }}
              error={fieldState.error?.message}
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
              onChange={(e) => {
                onChange(e)
                swapSamples(e)
              }}
              error={fieldState.error?.message}
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
              error={fieldState.error?.message}
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
              error={fieldState.error?.message}
            />
          )}
        />

        <Group>
          <Button
            c="primaryBlue"
            variant="subtle"
            onClick={toggle}
            size="sm"
            leftSection={
              samplesExpand ? (
                <Icon icon="mdi:chevron-down" />
              ) : (
                <Icon icon="mdi:chevron-right" />
              )
            }
          >
            <Group gap={8}>
              <Text>Объекты испытаний (ОИ)</Text>
              <Text c="dimmed">{fields.length}</Text>
            </Group>
          </Button>
        </Group>
        <Text c="errorRed" size="xs">
          {formState.errors.samples?.message}
        </Text>

        <Collapse expanded={samplesExpand}>
          <Stack>
            <Group>
              <Button
                variant="outline"
                leftSection={<IconPlus size={16} />}
                size="sm"
                onClick={() => append(getNewSample())}
                disabled={fields.length >= 12}
              >
                Добавить объект испытаний
              </Button>
            </Group>

            {fields.map((fieldItem, index) => (
              <Group key={fieldItem.id} align="center">
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
                      error={fieldState.error?.message}
                    />
                  )}
                />
                {fields.length > 1 && (
                  <ActionIcon
                    color="errorRed"
                    variant="subtle"
                    size="lg"
                    mt={8}
                    onClick={() => remove(index)}
                  >
                    <IconTrash size={24} />
                  </ActionIcon>
                )}
              </Group>
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </ScrollArea>
  )
}
