import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../store'
import { applicationsSlice } from '../../../features/applications/applicationStore'

import { useLazyGetClientConfirmedQuery } from '../api/clientsApi'

export const useUserConfirmationPolling = (intervalMs: number = 10000) => {
  const [getClientConfirmed] = useLazyGetClientConfirmedQuery()

  const dispatch = useAppDispatch()

  const isUserConfirmed = useAppSelector(
    (state) => state.applicationsSlice.isUserConfirmed
  )

  useEffect(() => {
    if (isUserConfirmed) return

    const checkStatus = async () => {
      try {
        const confirmData = await getClientConfirmed().unwrap()
        dispatch(
          applicationsSlice.actions.setIsUserConfirmed(confirmData.confirmed)
        )
      } catch (e) {
        console.error('Ошибка проверки подтверждения пользователя:', e)
      }
    }

    checkStatus()

    const intervalId = setInterval(checkStatus, intervalMs)

    return () => clearInterval(intervalId)
  }, [isUserConfirmed, intervalMs])
}
