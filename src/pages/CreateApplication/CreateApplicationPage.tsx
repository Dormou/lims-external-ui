import {
  Group,
  Title,
  Box,
  Stack,
  UnstyledButton,
  Text,
  Center,
  Loader,
} from '@mantine/core'
import '@mantine/core/styles.layer.css'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { PreformStep } from '../../features/applications/components/PreformStep'
import { useAutoSave } from '../../features/applications/hooks/useAutoSave'
import { CreateFormStep } from '../../features/applications/components/CreateFormStep'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SigningStep } from '../../features/applications/components/SigningStep'
import { useUserConfirmationPolling } from '../../features/applications/hooks/useUserConfirmationPolling'
import { SuccessStep } from '../../features/applications/components/SuccessStep'
import { useAppDispatch, useAppSelector } from '../../store'
import { useLazyGetApplicationQuery } from '../../api/applications/applicationsApi'
import { applicationsSlice } from '../../features/applications/applicationStore'

export const CreateApplicationPage = () => {
  const dispatch = useAppDispatch()

  const currentStep = useAppSelector(
    (state) => state.applicationsSlice.currentStep
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
          dispatch(applicationsSlice.actions.loadApplicationData(appData))
        } catch (e) {
          console.error('Не удалось восстановить заявку:', e)
          dispatch(applicationsSlice.actions.reset())
        }
      } else {
        dispatch(applicationsSlice.actions.reset())
        dispatch(applicationsSlice.actions.setStep(0))
      }
      setIsInitializing(false)
    }

    initForm()
  }, [appIdFromUrl])

  useAutoSave()
  useUserConfirmationPolling()

  return (
    <Stack gap={24} h="100%" w="100%">
      <Group h={45} justify="center" pos="relative" style={{ flexShrink: 0 }}>
        <UnstyledButton
          onClick={() => {
            navigate('/')
          }}
          style={{
            position: 'absolute',
            left: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon
            icon="mdi:chevron-left"
            width="24"
            height="24"
            color="#005B9C"
          />
          <Box px={24} py={8}>
            <Text
              c="#005B9C"
              style={{ fontFamily: 'PF Din Text Cond Pro', fontSize: '24px' }}
            >
              Назад
            </Text>
          </Box>
        </UnstyledButton>

        <Title c="#212529" order={2} style={{ fontFamily: 'DIN Pro' }}>
          Новая заявка
        </Title>
      </Group>

      {isInitializing ? (
        <Center h={400}>
          <Loader size="xl" />
        </Center>
      ) : (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          {currentStep === 0 && <PreformStep />}
          {currentStep === 1 && <CreateFormStep />}
          {currentStep === 2 && <SigningStep />}
          {currentStep === 3 && <SuccessStep />}
        </Box>
      )}
    </Stack>
  )
}
