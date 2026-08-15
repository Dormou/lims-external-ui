import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Table,
  Checkbox,
  Text,
  ScrollArea,
  Group,
  Divider,
  Stack,
  Flex,
  Button,
  Collapse,
} from '@mantine/core'
import { useGetMetadataQuery } from '../../api/createApplicationApi'
import { getActiveMeta } from '../../lib/helpers'
import { WarningTab } from './components/WarningTab'
import { Icon } from '@iconify/react'
import { useDisclosure } from '@mantine/hooks'
import type { TestMeta } from '../../model/types/branchMeta'
import type { DraftForm } from '../../model/draftSchema'

type ExtendedTestMeta = TestMeta & { hidden: boolean }

export const TestsTab = () => {
  const { data: metadata } = useGetMetadataQuery()
  const { getValues, control, setValue } = useFormContext<DraftForm>()

  const [activeTests, setActiveTests] = useState<ExtendedTestMeta[] | null>(
    getActiveMeta(
      metadata,
      getValues('branchId'),
      getValues('equipmentTypeId')
    )?.tests.map((testMeta) => ({ ...testMeta, hidden: false })) ?? null
  )

  const hiddenTests = activeTests?.filter((test) => test.hidden) ?? null

  const [hiddenExpand, { toggle }] = useDisclosure(false)

  const setTestHidden = (testId: string, hidden: boolean) => {
    setActiveTests(
      (prev) =>
        prev?.map((test) =>
          test.testId === testId ? { ...test, hidden: hidden } : test
        ) ?? null
    )
  }

  const resetTestValues = (testIndex: number) => {
    getValues('samples').forEach((_, sampleIndex) => {
      setValue(
        `samples.${sampleIndex}.testValues.${testIndex}.testValue`,
        false
      )
    })
  }

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
        <Stack>
          <Table
            stickyHeader
            striped="even"
            stripedColor="complementaryBlue"
            withRowBorders={false}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th bg="complementaryBlue" rowSpan={2} ta="center">
                  Испытание
                </Table.Th>
                <Table.Th
                  bg="complementaryBlue"
                  colSpan={getValues('samples').length}
                  ta="center"
                >
                  Объекты испытаний
                </Table.Th>
              </Table.Tr>
              <Table.Tr>
                {getValues('samples').map((_, index) => (
                  <Table.Th
                    bg="complementaryBlue"
                    key={`sample-show[${index}]`}
                    ta="center"
                  >
                    №{index + 1}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {activeTests?.map((test, testIndex) =>
                test.hidden ? null : (
                  <Table.Tr key={test.testId}>
                    <Table.Td>
                      <Group>
                        <Button
                          variant="subtle"
                          px={4}
                          onClick={() => {
                            resetTestValues(testIndex)
                            setTestHidden(test.testId, true)
                          }}
                        >
                          <Icon icon="mdi:eye-off-outline" />
                        </Button>
                        <Text variant="emphasis" w={400} lts={1}>
                          {test.testName}
                        </Text>
                        <Divider orientation="vertical" color="darkGray" />
                        <Stack w={400} gap={4}>
                          <Text size="xs">
                            {`Методы испытаний: ${test.testMethod}`}
                          </Text>
                          <Text size="xs">
                            {`Требования: ${test.requirements}`}
                          </Text>
                        </Stack>
                      </Group>
                    </Table.Td>
                    {getValues('samples').map((_, sampleIndex) => (
                      <Table.Td key={`${test.testId}${sampleIndex}`}>
                        <Flex justify="center">
                          <Controller
                            name={`samples.${sampleIndex}.testValues.${testIndex}.testValue`}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <Checkbox checked={value} onChange={onChange} />
                            )}
                          />
                        </Flex>
                      </Table.Td>
                    ))}
                  </Table.Tr>
                )
              )}
            </Table.Tbody>
          </Table>

          <Group>
            <Button
              c="primaryBlue"
              variant="subtle"
              onClick={toggle}
              size="sm"
              leftSection={
                hiddenExpand ? (
                  <Icon icon="mdi:chevron-down" />
                ) : (
                  <Icon icon="mdi:chevron-right" />
                )
              }
            >
              <Group gap={8}>
                <Text>Скрытые испытания</Text>
                <Text c="dimmed">{hiddenTests?.length ?? 0}</Text>
              </Group>
            </Button>
          </Group>
          <Collapse expanded={hiddenExpand}>
            <Table
              striped
              stripedColor="complementaryBlue"
              withRowBorders={false}
            >
              <Table.Tbody>
                {hiddenTests?.map((test, testIndex) => (
                  <Table.Tr key={`hidden${test.testId}`}>
                    <Table.Td>
                      <Group>
                        <Button
                          variant="subtle"
                          px={4}
                          onClick={() => setTestHidden(test.testId, false)}
                        >
                          <Icon icon="mdi:eye-outline" />
                        </Button>
                        <Text variant="emphasis" w={400} lts={1}>
                          {test.testName}
                        </Text>
                        <Divider orientation="vertical" color="darkGray" />
                        <Stack w={400} gap={4}>
                          <Text size="xs">
                            {`Методы испытаний: ${test.testMethod}`}
                          </Text>
                          <Text size="xs">
                            {`Требования: ${test.requirements}`}
                          </Text>
                        </Stack>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Collapse>
        </Stack>
      </ScrollArea>
    )
}
