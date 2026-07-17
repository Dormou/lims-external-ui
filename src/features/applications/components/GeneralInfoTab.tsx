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
} from '@mantine/core'
import { IconTrash, IconPlus } from '@tabler/icons-react'
import { useGetMetadataQuery } from '../../../api/references/referencesApi'
import { useAppDispatch, useAppSelector } from '../../../store'
import { applicationsSlice } from '../applicationStore'
import type {
  BranchMeta,
  EquipmentTypeMeta,
} from '../../../api/applications/types/types'
import { getUXTID } from '@/processes/pages/ApplicationsPage.test'

export const GeneralInfoTab = () => {
  const dispatch = useAppDispatch()

  const { branchId, equipmentTypeId, producerName, producerAddress, objects } =
    useAppSelector((state) => state.applicationsSlice)

  const { data: metadata } = useGetMetadataQuery()

  const branchData =
    metadata?.map((b: BranchMeta) => ({
      value: b.branchId,
      label: b.branchName,
    })) ?? []

  const selectedBranchData = metadata?.find((b) => b.branchId === branchId)
  const equipmentData =
    selectedBranchData?.equipmentTypes.map((t: EquipmentTypeMeta) => ({
      value: t.equipmentTypeId,
      label: t.equipmentTypeName,
    })) || []

  return (
    <ScrollArea>
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

        <Select
          ux-test-id={getUXTID("select-branch")}
          itemProp={`[ux-test-id="${getUXTID("branch")}"]`}
          label="Филиал подачи заявки"
          placeholder="Выберите филиал"
          required
          data={branchData}
          value={branchId}
          onChange={(val) => {
            dispatch(
              applicationsSlice.actions.updateGeneral({
                param: 'branchId',
                value: val ?? '',
              })
            )
            dispatch(
              applicationsSlice.actions.updateGeneral({
                param: 'equipmentTypeId',
                value: '',
              })
            )
          }}
        />

        <Text size="sm" ta="center">
          Если необходимый тип устройства отсутствует в списке, следуйте
          <Anchor
            ux-test-id={getUXTID("tab-object-params")}
            href="https://ntc-power.ru/about/structure/testing-certification/poryadok-podachi/"
            target="_blank"
            ml={5}
          >
            <u>Порядку подачи заявок</u>
          </Anchor>
        </Text>

        <Select
          ux-test-id={getUXTID("select-device-type")}
          itemProp={`[ux-test-id="${getUXTID("device-type")}"]`}
          label="Тип устройства"
          placeholder="Выберите тип устройства"
          required
          disabled={branchId === ''}
          data={equipmentData}
          value={equipmentTypeId}
          onChange={(val) =>
            dispatch(
              applicationsSlice.actions.updateGeneral({
                param: 'equipmentTypeId',
                value: val ?? '',
              })
            )
          }
        />

        <TextInput
          ux-test-id={getUXTID("input-manufacturer")}
          label="Предприятие-изготовитель"
          placeholder="Введите полное наименование предприятия-изготовителя"
          required
          value={producerName}
          onChange={(e) =>
            dispatch(
              applicationsSlice.actions.updateGeneral({
                param: 'producerName',
                value: e.target.value,
              })
            )
          }
        />

        <TextInput
          ux-test-id={getUXTID("input-production-address")}
          label="Адрес производства"
          placeholder="Введите адрес производственной площадки изготовителя"
          required
          value={producerAddress}
          onChange={(e) =>
            dispatch(
              applicationsSlice.actions.updateGeneral({
                param: 'producerAddress',
                value: e.target.value,
              })
            )
          }
        />

        <Group ux-test-id={getUXTID("summary-testing-objects-title")} justify="space-between">
          <Title order={5}>Объекты испытаний (ОИ) {objects.length}</Title>
          <Button
            ux-test-id={getUXTID("btn-add-testing-object")}
            variant="outline"
            leftSection={<IconPlus size={16} />}
            onClick={() => dispatch(applicationsSlice.actions.addObject())}
            disabled={objects.length >= 12}
          >
            Добавить объект испытаний
          </Button>
        </Group>

        {objects.map((obj, index) => (
          <Group  key={obj.id} align="flex-end">        
            <TextInput
              ux-test-id={getUXTID("testing-object-input")}
              label={`Полное наименование объекта испытаний №${index + 1}`}
              placeholder="Введите полное наименование образца/типопредставителя согласно технической документации"
              required
              style={{ flex: 1 }}
              value={obj.name}
              onChange={(e) =>
                dispatch(
                  applicationsSlice.actions.updateObjectName({
                    id: obj.id,
                    name: e.target.value,
                  })
                )
              }
            />
            {objects.length > 1 && (
              <ActionIcon
                color="red"
                variant="subtle"
                size="lg"
                onClick={() =>
                  dispatch(applicationsSlice.actions.removeObject(obj.id))
                }
              >
                <IconTrash size={20} />
              </ActionIcon>
            )}
          </Group>
        ))}
      </Stack>
    </ScrollArea>
  )
}
