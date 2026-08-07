import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Stack, Group, Button, Title, Center, Loader } from '@mantine/core'
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

  return (
    <Stack gap={24} h="100%" w="100%">
      <Group h={45} justify="center" pos="relative">
        <Button
          variant="subtle"
          color="primaryBlue"
          leftSection={<Icon icon="mdi:chevron-left" width="24" height="24" />}
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

      {isApplicationLoading || isMetadataLoading ? (
        <Center h={400}>
          <Loader size="xl" />
        </Center>
      ) : (
        <Stack align="center" flex="1 1 auto">
          {currentStep == 'preform' && <PreformStep />}
          {currentStep == 'draft' && <DraftStep />}
          {currentStep == 'signing' && (
            <SigningStep setCurrentStep={setCurrentStep} />
          )}
          {currentStep == 'success' && <SuccessStep />}
        </Stack>
      )}
    </Stack>
  )
}
