import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import {
  Stack,
  Group,
  Button,
  Title,
  Center,
  Loader,
  Text,
} from '@mantine/core'
import { Icon } from '@iconify/react'
import { RoutesPath } from '@/shared/config'
import { DraftStep } from './draft-step/DraftStep'
import { PreformStep } from './preform-step/PreformStep'
import { SigningStep } from './signing-step/SigningStep'
import { SuccessStep } from './success-step/SuccessStep'
import { useGetApplicationQuery } from '@/entities/application'
import { useGetMetadataQuery } from '@/entities/metadata'

export type Step = 'preform' | 'draft' | 'signing' | 'success'

const getStepFromStatus = (status?: string): Step => {
  switch (status) {
    case 'Черновик':
      return 'draft'
    case 'Сформирована':
      return 'signing'
    case 'Отправлена':
      return 'success'
    default:
      return 'preform'
  }
}

export const CreateApplicationForm = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const { data: applicationData, isLoading: isApplicationLoading } =
    useGetApplicationQuery(searchParams.get('id') ?? '', {
      skip: !searchParams.get('id'),
      refetchOnMountOrArgChange: true,
    })

  const { isLoading: isMetadataLoading } = useGetMetadataQuery()

  // Используется для переключения на редактирование заявки, минуя статус
  const [manualEdit, setManualEdit] = useState(false)

  const currentStep: Step = manualEdit
    ? 'draft'
    : getStepFromStatus(applicationData?.status)

  if (isApplicationLoading || isMetadataLoading)
    return (
      <Center h="stretch">
        <Loader size="xl" />
      </Center>
    )
  else if (!!searchParams.get('id') && !applicationData)
    return (
      <Stack h="stretch" justify="center" align="center">
        <Icon
          icon="mdi:error-outline"
          width={48}
          height={48}
          color="var(--mantine-color-dimmed)"
        />
        <Text c="dimmed" size="xl">
          Не удалось загрузить заявку, пожалуйста попробуйте позже
        </Text>
        <Button
          variant="subtle"
          color="primaryBlue"
          onClick={() => navigate(RoutesPath.Home)}
        >
          Вернуться на главную
        </Button>
      </Stack>
    )
  else
    return (
      <Stack gap={24} h="100%" w="100%">
        <Group h={45} justify="center" pos="relative">
          <Button
            variant="subtle"
            color="primaryBlue"
            leftSection={
              <Icon icon="mdi:chevron-left" width="24" height="24" />
            }
            onClick={() => navigate(RoutesPath.Home)}
            pos="absolute"
            left={0}
          >
            Назад
          </Button>

          <Title c="black" order={2}>
            Новая заявка
          </Title>
        </Group>

        <Stack align="center" flex="1 1 auto" mih={0}>
          {currentStep == 'preform' && <PreformStep />}
          {currentStep == 'draft' && applicationData && (
            <DraftStep
              application={applicationData}
              setManualEdit={setManualEdit}
            />
          )}
          {currentStep == 'signing' && applicationData && (
            <SigningStep
              setManualEdit={setManualEdit}
              application={applicationData}
            />
          )}
          {currentStep == 'success' && applicationData && (
            <SuccessStep application={applicationData} />
          )}
        </Stack>
      </Stack>
    )
}
