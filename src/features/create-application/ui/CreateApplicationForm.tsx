import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import { useGetApplication } from '../lib/useGetApplication'
import { useGetMetadataQuery } from '../api/createApplicationApi'

export type Step = 'preform' | 'draft' | 'signing' | 'success'

export const CreateApplicationForm = () => {
  const navigate = useNavigate()

  const { applicationData, isApplicationLoading } = useGetApplication()
  const { isLoading: isMetadataLoading } = useGetMetadataQuery()

  const [currentStep, setCurrentStep] = useState<Step>('preform')

  useEffect(() => {
    if (applicationData) {
      switch (applicationData.status) {
        case 'Черновик':
          setCurrentStep('draft')
          break
        case 'Сформирована':
          setCurrentStep('signing')
          break
        case 'Отправлена':
          setCurrentStep('success')
          break
      }
    }
  }, [applicationData])

  if (isApplicationLoading || isMetadataLoading)
    return (
      <Center h="stretch">
        <Loader size="xl" />
      </Center>
    )
  else if (currentStep !== 'preform' && !applicationData)
    return (
      <Stack h="stretch" justify="center" align="center">
        <Icon icon="mdi:error-outline" width={48} height={48} opacity={0.3} />
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
            <DraftStep application={applicationData} />
          )}
          {currentStep == 'signing' && applicationData && (
            <SigningStep
              setCurrentStep={setCurrentStep}
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
