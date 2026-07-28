import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Stack, Group, Button, Title, Center, Loader } from '@mantine/core'
import { Icon } from '@iconify/react'
import { RoutesPath } from '@/shared/config'
import { useLazyGetApplicationQuery } from '@/entities/application'
import {
  loadApplicationData,
  reset,
  setStep,
} from '../model/createApplicationSlice'
import { useAutoSave } from '../lib/useAutoSave'
import { useUserConfirmationPolling } from '../lib/useUserConfirmationPollling'
import { CreateFormStep } from './steps/CreateFormStep'
import { PreformStep } from './steps/PreformStep'
import { SigningStep } from './steps/SigningStep'
import { SuccessStep } from './steps/SuccessStep'

export const CreateApplicationForm = () => {
  const dispatch = useDispatch()

  const currentStep = useSelector(
    (state) => state.createApplication.currentStep
  )

  const [getApplication] = useLazyGetApplicationQuery()

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const appIdFromUrl = searchParams.get('id')
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const initForm = async () => {
      if (typeof appIdFromUrl === 'string') {
        try {
          // Загружаем данные существующей заявки
          const appData = await getApplication(appIdFromUrl).unwrap()
          dispatch(loadApplicationData(appData))
        } catch (e) {
          console.error('Не удалось восстановить заявку:', e)
          dispatch(reset())
        }
      } else {
        dispatch(reset())
        dispatch(setStep(0))
      }
      setIsInitializing(false)
    }

    initForm()
  }, [appIdFromUrl])

  useAutoSave()
  useUserConfirmationPolling()

  return (
    <Stack gap={24} h="100%" w="100%">
      <Group h={45} justify="center" pos="relative" flex="0 0 auto">
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

      {isInitializing ? (
        <Center h={400}>
          <Loader size="xl" />
        </Center>
      ) : (
        <Stack align="center" h="80vh">
          {currentStep === 0 && <PreformStep />}
          {currentStep === 1 && <CreateFormStep />}
          {currentStep === 2 && <SigningStep />}
          {currentStep === 3 && <SuccessStep />}
        </Stack>
      )}
    </Stack>
  )
}
